import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';

const SideBar = ({ isOpen, onClose }) => {
  return (
    <Offcanvas show={isOpen} onHide={onClose} placement="end" className="custom-offcanvas">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <button className='profile btn m-2 rounded-pill'>
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
              <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg>
          </button>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className='offcanvas-body'>
        <nav className="nav flex-column">
          <a href="/" className="nav-link">Home</a>
          <a href='/orders' className="nav-link">Orders</a>
          <a href='/blog' className="nav-link">Blog</a>
          <a href="/cart" className="nav-link">Cart</a>
          <a href="/help" className="nav-link">Help</a>
          <a href="#" className="nav-link text-danger">Log out</a>
        </nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SideBar;
