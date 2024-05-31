import React from 'react';
import Nav from 'react-bootstrap/Nav';
import logo from '../logo/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = ({ toggleSideBar }) => {
  return (
    <div className="navbar-container d-flex justify-content-between align-items-center p-3 bg-light shadow-sm">
      <div className='logo d-flex align-items-center'>
        <img src={logo} alt="logo" className='mx-3 logo-img' />
        <h1 className='logo m-2' style={{color:'#1c5f21'}}>GLUTTONOUS GLUTEN</h1>
      </div>
      <Nav defaultActiveKey="/" as="ul" className='navBar m-3 rounded-pill bg-white shadow-sm'>
        <Nav.Item as="li">
          <Nav.Link href="/" className='text-dark m-2 rounded-pill nav-link-custom'>Home</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link href="/blog" className='text-dark m-2 rounded-pill nav-link-custom'>Blogs</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link href="/blog/create" className='text-dark m-2 rounded-pill nav-link-custom'>Create Blog</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link href="/cart" className='text-dark m-2 rounded-pill nav-link-custom'>Cart</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link href="/help" className='text-dark m-2 rounded-pill nav-link-custom'>Contact Us</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li" className='ms-auto porfile-container'>
          <button className='profile btn btn-outline-primary m-2 rounded-pill' onClick={toggleSideBar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-person-circle"
              viewBox="0 0 16 16"
              style={{ color: '#1acd81' }}
            >
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
