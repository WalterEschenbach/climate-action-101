import React from 'react'
import Navigation from '../../navigation/Navigation'
import {Card, Button, Container} from 'react-bootstrap'
import {BsArrowUpCircle, BsArrowDownCircle} from 'react-icons/bs'
import {useIssue} from '../../../graphql/queries'
import { useParams } from "react-router"
import CommentContainer from '../comment/comment-container/CommentContainer'

const ClimateActionSingle = () => {
    const params = useParams();

    const {loading, error, data} = useIssue(params.id);
    if (loading) return <p>Loading...</p>;
    if (error) console.log(JSON.stringify(error, null, 2));
    if (data) console.log('data_single: ', data)    

    const issue = data.issue_single;
    const votes = issue ? issue.upvotes.length - issue.downvotes.length : 0;

    return (
        <React.Fragment>
        {data && (
            <Container >
                <Navigation />
                <div className="d-flex justify-content-center">
                    <Card className="m-2 col-lg-3" style={{ minWidth: '60vw', maxWidth: "65vw" }}>
                        <Card.Img variant="top" src={issue.imgURL} />
                        <Card.Body>
                        <div className='d-flex justify-content-between'>
                            <Card.Title>{issue.title}</Card.Title>
                            <Card.Text>{issue.author.name}</Card.Text>
                        </div>
                        <Card.Text>{issue.description}</Card.Text>
                            <div className='d-flex justify-content-between'>
                                <div className='d-flex'>
                                    <Button variant="outline-primary"><BsArrowUpCircle/></Button>
                                    <h2 className='mx-3'>{votes}</h2>
                                    <Button variant="outline-secondary"><BsArrowDownCircle/></Button>
                                </div>
                            </div>
                            <div>
                             <CommentContainer data={issue}/>
                            </div>
                        </Card.Body>
                    </Card>

                </div>
            </Container>
        )}
        </React.Fragment>
    )
}

export default ClimateActionSingle
