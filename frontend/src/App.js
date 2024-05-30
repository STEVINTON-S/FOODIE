import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './components/Home';
import Blog from './components/Blog';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from './components/SideBar';
import Help from './components/Help';
import CreateBlog from './components/CreateBlog';
import ViewCart from './components/ViewCart';
import AdminRouter from './Admin/AdminRouter';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSideBar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const onClose = () => {
    setIsSidebarOpen(false);
  };

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="App">
      {!isAdminRoute && <NavBar toggleSideBar={toggleSideBar} />}
      <SideBar isOpen={isSidebarOpen} onClose={onClose} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/help" element={<Help />} />
          <Route path="/blog/create" element={<CreateBlog />} />
          <Route path="/cart" element={<ViewCart />} />
          {/* Admin routes */}
          <Route path="/admin/*" element={<AdminRouter />} />
        </Routes>
      </div>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
