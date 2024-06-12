import React from 'react';
import { Route, Routes } from "react-router-dom";
import StaffNavBar from './StaffNavBar';
import StaffHome from './StaffHome';
import StaffLogin from './StaffLogin';

const StaffRouter = () => {
  return (
    <div className='staff'>
      <Routes>
        <Route path='/' element={<StaffLogin />} />
        <Route path='*' element={ /* Change path='/*' to path='*' */
          <>
            <StaffNavBar />
            <div className='staff-content'>
              <Routes>
                <Route path='/home/:id' element={<StaffHome />} />
              </Routes>
            </div>
          </>
        } />
      </Routes>
    </div>
  );
};

export default StaffRouter;
