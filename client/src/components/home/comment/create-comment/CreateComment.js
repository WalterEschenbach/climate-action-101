import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import { CREATE_COMMENT } from '../../../../graphql/mutations'
import { useAuth } from '../../../../contexts/AuthContext'
import { useMutation } from '@apollo/client'

const CreateComment = ({data, comments, setComments}) => {
    const {currentUser} = useAuth();
    const [message, setMessage] = useState('')
    const [createComment] = useMutation(CREATE_COMMENT);

    const handleSubmit = (e) => {
        e.preventDefault();
        let newComment = {
            author: currentUser.id,
            issue: data.id,
            message
        };
        createComment({variables: newComment});
        setComments([...comments, {author: {name: currentUser.name}, message}]);
        setMessage('');
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Comment</Form.Label>
                <Form.Control as="textarea" rows={3} onChange={e=>setMessage(e.currentTarget.value)} value={message} />
            </Form.Group>
            <Button variant="outline-secondary" type='submit'>submit</Button>
        </Form>
    )
}

export default CreateComment
