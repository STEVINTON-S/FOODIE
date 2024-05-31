import React, { useState } from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
=======
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
>>>>>>> 8ba84e33e6264d90c231a394e4e23d4c5755e399
import NavBar from './components/NavBar';
import Home from './components/Home';
import Blog from './components/Blog';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from './components/SideBar';
import Help from './components/Help';
import CreateBlog from './components/CreateBlog';
import ViewCart from './components/ViewCart';
<<<<<<< HEAD
import AdminRouter from './Admin/AdminRouter';
=======
// import Footer from './components/Footer';
>>>>>>> 8ba84e33e6264d90c231a394e4e23d4c5755e399

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSideBar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const onClose = () => {
    setIsSidebarOpen(false);
  };

<<<<<<< HEAD
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
=======
  return (
    <Router>
      <div className="App">
        <NavBar toggleSideBar={toggleSideBar} />
        <SideBar isOpen={isSidebarOpen} onClose={onClose} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/blog' element={<Blog/>}/>
            <Route path='/help' element={<Help/>}/>
            <Route path='/blog/create' element={<CreateBlog/>}/>
            <Route path='/cart' element={<ViewCart/>}/>
          </Routes>
        </div>
        {/* <Footer/> */}
      </div>
>>>>>>> 8ba84e33e6264d90c231a394e4e23d4c5755e399
    </Router>
  );
}

<<<<<<< HEAD
export default AppWrapper;
=======
export default App;
>>>>>>> 8ba84e33e6264d90c231a394e4e23d4c5755e399
