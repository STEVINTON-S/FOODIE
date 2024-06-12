import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './staff.css';
import StaffNavBar from './StaffNavBar';

const StaffLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const [userState, setUserState] = useState(false);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/staff/login', credentials);
      if (response.status === 200) {
        navigate(`/staff/home/${response.data.kitchenId}`);
        setUserState(false);
      } else {
        setUserState(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setUserState(true);
      } else {
        console.error('An error occurred:', error);
      }
    }
  };

  return (
    <div>
      <StaffNavBar/>
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Username"
          className="login-input"
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
          className="login-input"
        />
        <button type="submit" className="login-button">Login</button>
      </form>
      {userState && 
        <div className="error-message">
          <h3 className='text-danger'>Invalid user</h3>
        </div>
      }
    </div>
    </div>
  );
};

export default StaffLogin;
