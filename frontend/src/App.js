import React, { useState } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './components/Home';
import Blog from './components/Blog';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from './components/SideBar';
import Help from './components/Help';
import CreateBlog from './components/CreateBlog';
import ViewCart from './components/ViewCart';
import AdminRouter from '../src/components/Admin/AdminRouter';
import Footer from './components/Footer';
import OrderPlaced from './components/OrderPlaced';
import StaffRouter from './Staff/StaffRouter';
import OrderTracking from './components/OrderTracking';
import MealCook from './components/MealCook';
import MealCookPricing from './components/MealCookPricing';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSideBar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const onClose = () => {
    setIsSidebarOpen(false);
  };

  const location = useLocation();
  const isSpecialRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/staff');

  return (
    <div className="App">
      {!isSpecialRoute && <NavBar toggleSideBar={toggleSideBar} />}
      <SideBar isOpen={isSidebarOpen} onClose={onClose} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/help" element={<Help />} />
          <Route path="/blog/create" element={<CreateBlog />} />
          <Route path="/cart" element={<ViewCart />} />
          <Route path='/orderPlaced' element={<OrderPlaced/>}/>
          <Route path='/orders' element={<OrderTracking/>} />
          <Route path='/mealCook' element={<MealCook/>}/>
          <Route path='/pricing' element={<MealCookPricing/>}/>
          {/* Admin routes */}
          <Route path="/admin/*" element={<AdminRouter />} />
          {/* Staff Router */}
          <Route path="/staff/*" element={<StaffRouter/>} />
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
