import React, {useEffect} from 'react'
import {useQuery} from '@apollo/client'
import {GET_ISSUES} from '../../graphql/queries'
import {useAuth} from '../../contexts/AuthContext'

import Navigation from '../navigation/Navigation'
import ClimateActionList from './climate-action-list/ClimateActionList';
import {Container} from 'react-bootstrap'

const Home = () => {
    const {currentUser} = useAuth();

    const {loading, error, data} = useQuery(GET_ISSUES)
        if (loading) return <p>Loading...</p>;
        if (error) console.log(error);
        if (data) console.log('data: ', data)    

    return (
        <Container>
            <Navigation/>
            <ClimateActionList data={data.issues}/>
        </Container>
    )
}

export default Home