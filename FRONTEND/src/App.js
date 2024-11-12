import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Services from './pages/Service';
import Contact from './pages/Contact';
import Payment from './pages/Payment';
import Bookings from './pages/BookNow'; // Adjust the import path as necessary
import AdminLogin from './pages/AdminLogin';
// import AdminDash from './pages/AdminDash';

function AppContent() {
  const location = useLocation();
  
  const hideNavbarPaths = ['/login', '/register', '/forgot-password', '/admin-login','/admin-dashboard']; // Added /admin-login to the array

  return (
    <div className='App'>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        {/* <Route path="/admin-dashboard" element={<AdminDash/>} />New AdminLogin route */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;