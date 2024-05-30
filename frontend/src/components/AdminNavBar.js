import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../logo/logo.png';  // Adjust the path to your logo file

function AdminNavBar() {
  return (
    <Navbar style={{background: 'linear-gradient(to bottom, #1acd81, #0fa968)'}}>
      <Container>
        <div className="d-flex align-items-center">
          <img src={logo} alt="logo" className='mx-3 logo-img' />
          <h1 className='logo-text text-danger m-2'>Gluttonous Gluten</h1>
        </div>
        <Nav className="ms-auto">
          <Nav.Link href="/admin" className='m-2'>Home</Nav.Link>
          <Nav.Link href="/admin/discounts" className='m-2'>Discounts</Nav.Link>
          <Nav.Link href="/admin/createUser" className='m-2'>Users</Nav.Link>
          <Nav.Link href="/admin/helps" className='m-2'>Helps</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default AdminNavBar;
