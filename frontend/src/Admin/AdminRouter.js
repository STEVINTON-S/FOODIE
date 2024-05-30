import React from 'react';
import { Route, Routes } from "react-router-dom";
import AdminNavBar from '../components/AdminNavBar';
import AdminHome from '../components/AdminHome';
import AddDiscounts from '../components/AddDiscounts';
import AddUser from '../components/AddUser';
import AdminHelps from '../components/AdminHelps';

function AdminRouter() {
  return (
    <div className="Admin">
      <AdminNavBar />
      <div className="admin-content">
        <Routes>
          <Route path="/" element={<AdminHome />} />
          <Route path='/discounts' element={<AddDiscounts/>}/>
          <Route path='/createUser' element={<AddUser/>}/>
          <Route path='/helps' element={<AdminHelps/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default AdminRouter;
