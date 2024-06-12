// StaffNavBar.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import logo from '../logo/logo.png'

const StaffNavBar = () => {
  return (
    <Navbar style={{background: 'linear-gradient(to bottom, #1acd81, #0fa968)'}}>
      <Container>
        <div className="d-flex align-items-center">
          <img src={logo} alt="logo" className='mx-3 logo-img' />
          <h1 className='logo-text text-danger m-2'>Gluttonous Gluten</h1>
        </div>
        <Nav className="ms-auto">
          <Link to="/staff" className='nav-link m-2'>Home</Link> {/* Use Link instead of Nav.Link */}
        </Nav>
      </Container>
    </Navbar>
  )
}

export default StaffNavBar;
