import React from 'react'
import Navigation from '../navigation/Navigation'
import ClimateActionList from '../home/climate-action-list/ClimateActionList'
import { Container } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { GetIssuesUser } from '../../graphql/queries'

const MyIssues = () => {
    const {currentUser} = useAuth();
    
    const {loading, error, data} = GetIssuesUser(currentUser.id);
    if (loading) return <p>Loading...</p>;
    if (error) console.log(JSON.stringify(error, null, 2));
    if (data) console.log('issues_user: ', data.issues_user)  

    return (
        <Container>
            <Navigation />
            {data && <ClimateActionList data={data.issues_user}/>}
        </Container>
    )
}

export default MyIssues
