import React, {useState} from 'react'
import {Card, Button} from 'react-bootstrap'
import {BsArrowUpCircle, BsArrowDownCircle} from 'react-icons/bs'
import {GoComment} from 'react-icons/go'
import {Link} from 'react-router-dom'
import {useAuth} from '../../../contexts/AuthContext'
import { useMutation } from '@apollo/client'
import { VOTE } from '../../../graphql/mutations'

const ClimateActionListItem = ({data}) => {
    const {currentUser} = useAuth();
    const [vote] = useMutation(VOTE);
    const [votes, setVotes] = useState(data.upvotes.length - data.downvotes.length);

    const handleUp = async (e) => {
        e.preventDefault();
        let upVote = {
            author: currentUser.id,
            issue: data.id,
            direction: true
        };
        await vote({variables: upVote});
        setVotes(prevState => prevState + 1);
    }

    const handleDown = async (e) => {
        e.preventDefault();
        let downVote = {
            author: currentUser.id,
            issue: data.id,
            direction: false
        };
        await vote({variables: downVote});
        setVotes(prevState => prevState - 1);
    }


    return (
        <Card className="m-2 col-lg-3" style={{ width: '24rem' }} >
            <Card.Img variant="top" src={data.imgURL} />
            <Card.Body>
                <div className='d-flex justify-content-between'>
                    <Card.Title>{data.title}</Card.Title>
                    <Card.Text>{data.author?.name}</Card.Text>
                </div>
                <Card.Text>{data.description}</Card.Text>
                <div className='d-flex justify-content-between'>
                    <div className='d-flex'>
                        <Button variant="outline-primary" onClick={handleUp}><BsArrowUpCircle/></Button>
                        <h2 className='mx-3'>{votes}</h2>
                        <Button variant="outline-secondary" onClick={handleDown}><BsArrowDownCircle/></Button>
                    </div>
                    <Link to={`/issue/${data.id}`}><Button variant="outline-secondary"><GoComment/> comments</Button></Link>
                </div>
            </Card.Body>
        </Card>
    )
}

export default ClimateActionListItem
