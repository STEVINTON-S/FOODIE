import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './components/Home';
import Blog from './components/Blog';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from './components/SideBar';
import Help from './components/Help';
import SelectedBlog from './components/SelectedBlog';
import CreateBlog from './components/CreateBlog';
import ViewCart from './components/ViewCart';
// import Footer from './components/Footer';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSideBar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const onClose = () => {
    setIsSidebarOpen(false);
  };

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
            <Route path='/blog/:id' element={<SelectedBlog/>}/>
            <Route path='/blog/create' element={<CreateBlog/>}/>
            <Route path='/cart' element={<ViewCart/>}/>
          </Routes>
        </div>
        {/* <Footer/> */}
      </div>
    </Router>
  );
}

export default App;
