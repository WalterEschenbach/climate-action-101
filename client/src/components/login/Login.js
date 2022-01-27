import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './login.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const {login} = useAuth()
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            await login(email, password); 
            navigate('/home')
            setLoading(false)
        } catch (error) {
            throw new Error(error)            
        }
      }


    return (
        <div id="login-container" className='d-flex justify-content-center align-items-center'>
            <Form onSubmit={handleSubmit} className='d-flex flex-column justify-content-center align-items-center col-4'>
                <img src="./globe-icon.png" alt="globe-icon" style={{width: "4rem"}}/>
                <h3>Climate Action 101</h3>
                <br/>
                <Form.Group className="form-group col-12">
                    <Form.Control type="email" className="form-control" placeholder="Email" onChange={e=>setEmail(e.currentTarget.value)}/>
                </Form.Group>
                <br />
                <Form.Group className="form-group col-12">
                    <Form.Control type="password" className="form-control" placeholder="Password" onChange={e=>setPassword(e.currentTarget.value)} />
                </Form.Group>
                <br />

                <Button type="submit"  className="btn btn-dark btn-lg btn-block col-12" disabled={loading}>Log in</Button>
                <h4>or</h4>
                <Link to="/signup" className='col-12'><Button type="submit" className="btn btn-dark btn-lg btn-block col-12" disabled={loading}>Sign up</Button></Link>
                <p className="forgot-password text-right">
                    Forgot <a href="/login">password?</a>
                </p>
                <br />
                <br />
                <br />
                <p className='col-12 text-center'>
                By continuing, you agree to Climate Action 101 Terms of Service and acknowledge you've read our Privacy Policy
                </p>
            </Form>
        </div>
    )
}

export default Login