import React from 'react';
import { Route, Routes } from "react-router-dom";
import AdminNavBar from './AdminNavBar';
import AdminHome from './AdminHome';
import AddDiscounts from './AddDiscounts';
import AddUser from './AddUser';
import AdminHelps from './AdminHelps';
import AdminLogin from './AdminLogin';

function AdminRouter() {
  return (
    <div className="Admin">
      <AdminNavBar />
      <div className="admin-content">
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/home/:id" element={<AdminHome />} />
          <Route path='/discounts' element={<AddDiscounts/>}/>
          <Route path='/createUser' element={<AddUser/>}/>
          <Route path='/helps' element={<AdminHelps/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default AdminRouter;
