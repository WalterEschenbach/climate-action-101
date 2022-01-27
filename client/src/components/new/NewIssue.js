import React, {useState} from 'react'
import {Container, Form, Button, InputGroup, FormControl} from 'react-bootstrap'
import { CREATE_ISSUE_MUTATION } from '../../graphql/mutations'
import Navigation from '../navigation/Navigation'
import { useMutation } from '@apollo/client'
import {useNavigate} from 'react-router'
import { useAuth } from '../../contexts/AuthContext'

const NewIssue = () => {
    const navigate = useNavigate();
    const [createIssue] = useMutation(CREATE_ISSUE_MUTATION);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imgURL, setImgURL] = useState('');

    const {currentUser} = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();

        createIssue({
            variables: {
              title,
              author: currentUser.id,
              description,
              imgURL
            }
          });
        
        navigate('/home')
    }

    return (
        <Container >
            <Navigation/>
            <div className="form-container d-flex justify-content-center align-items-center">
                <Form onSubmit={handleSubmit} className='col-lg-8 mt-5 d-flex flex-column align-items-center'>
                    <InputGroup className="mb-3" >
                        <InputGroup.Text>Title</InputGroup.Text>
                        <Form.Control type="title" placeholder="Enter title" onChange={(e)=>setTitle(e.currentTarget.value)}/>
                    </InputGroup>
                  
                    <InputGroup className="mb-3" >
                        <InputGroup.Text>Image</InputGroup.Text>
                        <Form.Control type="url" placeholder="URL" onChange={(e)=>setImgURL(e.currentTarget.value)}/>
                    </InputGroup>

                    <InputGroup style={{minHeight: "20rem"}}>
                        <InputGroup.Text>Description</InputGroup.Text>
                        <FormControl as="textarea" aria-label="With textarea" onChange={(e)=>setDescription(e.currentTarget.value)}/>
                    </InputGroup>

                    <Button className="mt-5" variant="primary" type="submit" style={{width: "10rem"}}>
                        Submit
                    </Button>
                </Form>

            </div>
        </Container>
    )
}

export default NewIssue
