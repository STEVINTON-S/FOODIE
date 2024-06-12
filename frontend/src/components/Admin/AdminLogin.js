import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import AdminNavBar from './AdminNavBar';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/admin/login', credentials);
      if (response.status === 200) {
        navigate(`/admin/home/${response.data.kitchenId}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError(true);
      } else {
        console.error('An error occurred:', error);
      }
    }
  };

  return (
    <div>
      <div className="login-container">
        <h1>Login</h1>
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Group controlId="formUsername">
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="login-button">
            Login
          </Button>
        </Form>
        {error && 
          <Alert variant="danger" className="error-message">
            Invalid username or password
          </Alert>
        }
      </div>
    </div>
  );
};

export default AdminLogin;
