import React, {useState} from 'react'
import {Form, Button, Container} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './signup.css';

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const {signup} = useAuth()

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            signup(email, password, name);
            navigate('/home')
        } catch (error) {
            throw new Error(error)            
        }
        setLoading(false)
      }

    return (
        <Container>
            <div id="login-container" className='d-flex justify-content-center align-items-center'>
            <Form onSubmit={handleSubmit} className='d-flex flex-column justify-content-center align-items-center col-4'>
                <img src="./globe-icon.png" alt="globe-icon" style={{width: "4rem"}}/>
                <h3>Climate Action 101</h3>
                <br/>
                <Form.Group className="form-group col-12">
                    <Form.Control type="name" className="form-control" placeholder="Name" onChange={e=>setName(e.currentTarget.value)} />
                </Form.Group>
                <br/>
                <Form.Group className="form-group col-12">
                    <Form.Control type="email" className="form-control" placeholder="Email" onChange={e=>setEmail(e.currentTarget.value)} />
                </Form.Group>
                <br />
                <Form.Group className="form-group col-12">
                    <Form.Control type="password" className="form-control" placeholder="Password" onChange={e=>setPassword(e.currentTarget.value)} />
                </Form.Group>
                <br />

                <Button type="submit" className="btn btn-dark btn-lg btn-block col-12" disabled={loading}>Sign up</Button>
                <h4>or</h4>
                <Link to="/login" className='col-12'><Button type="submit" className="btn btn-dark btn-lg btn-block col-12" disabled={loading}>Log in</Button></Link>
            
                <br />
                <br />
                <br />
                <p className='col-12 text-center'>
                By continuing, you agree to Climate Action 101 Terms of Service and acknowledge you've read our Privacy Policy
                </p>
            </Form>
        </div>

        </Container>
    )
}

export default Signup