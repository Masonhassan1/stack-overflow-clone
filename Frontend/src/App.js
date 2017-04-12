import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
// import Login from './Pages/Login';
// import Register from './Pages/Register';

import AddQuestion from "./pages/AddQuestions/index";
import Navbar from './components/Navbar';
import ViewQuestion from './pages/ViewQuestion/ViewQuestion';
import Login from './pages/Login/Login';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  
  return (
    // <BrowserRouter>
    // <Navbar/>
    //   <Routes>
    //       <Route path="/" element={<Dashboard />}/>
    //       {/* <Route index element={<Dashboard />} /> */}
    //       <Route path="/add-question" element={<AddQuestion />} />
    //       <Route path="/question" element={<ViewQuestion />} />
    //       {/* <Route path="/login" element={<Login />} />
    //       <Route path="register" element={<Register />} /> */}
    //       {/* <Route path="*" element={<NoPage />} /> */}
    //     {/* </Route> */}
    //   </Routes>
    // </BrowserRouter>

    <Router>
    {/* <Navbar
      // loginState={isLoggedIn}
      // changeState={setIsLoggedIn}
    /> */}
    <Routes>
      {/* <Route exact path="/auth" component={Auth} /> */}
      <Route path="/" element={<Dashboard />}/>
      <Route path="/add-question" element={<AddQuestion />} />
      <Route path="/question" element={<ViewQuestion />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </Router>
  );
}

export default App;