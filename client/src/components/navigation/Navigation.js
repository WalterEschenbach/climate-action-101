import React from 'react'
import {Navbar, Nav, NavDropdown, Container} from 'react-bootstrap'
import {MdPostAdd} from 'react-icons/md'
import { useAuth } from '../../contexts/AuthContext';

const Navigation = () => {
    const {logout} = useAuth();


    return (
        <Navbar bg="dark" variant='dark' expand="sm">
            <Container>
            <Navbar.Brand href="#home">
                <img className="me-2" src="/globe-icon.png" alt="globe-icon" style={{width: "2rem"}} />
                Climate Action 101
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                </Nav>
                <Nav >
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/issue/my">My Issues</Nav.Link>
                    <Nav.Link href="/issue/new"><MdPostAdd/>New</Nav.Link>
                    <NavDropdown title="Account" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={()=>logout()}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation
