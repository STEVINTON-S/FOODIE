import React from 'react';
import logo from '../../logo/logo.png';

const BotIcon = ({ onClick }) => (
  <div style={{ position: 'fixed', bottom: '20px', right: '20px', cursor: 'pointer' }}>
    <img src={logo} alt="Logo" style={{ width: '50px'}} onClick={onClick} />
  </div>
);

export default BotIcon;
