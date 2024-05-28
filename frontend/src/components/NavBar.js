import React from 'react';
import Nav from 'react-bootstrap/Nav';
import logo from '../logo/logo.png';

const NavBar = ({ toggleSideBar }) => {
  return (
    <div className="navbar-container d-flex justify-content-between align-items-center">
      <div className='logo d-flex align-items-center'>
      <img src={logo} alt="logo.png" className='mx-3 logo-img'/>
        <h1 className='logo-text text-danger m-2'>Gluttonous Gluten</h1>
      </div>
      <Nav defaultActiveKey="/" as="ul" className='navBar m-3 rounded-pill'>
        <Nav.Item as="li">
          <Nav.Link href="/" className='text-dark m-2 rounded-pill'>Home</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link href="/blog" className='text-dark m-2 rounded-pill'>Blogs</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link href="/blog/create" className='text-dark m-2 rounded-pill'>Create Blog</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link href="/cart" className='text-dark m-2 rounded-pill'>Cart</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link href="/help" className='text-dark m-2 rounded-pill'>Contact Us</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li" className='ms-auto'>
          <button className='profile btn m-2 rounded-pill' onClick={toggleSideBar}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
              <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg>
          </button>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default NavBar;
