// src/pages/AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminLogin.css';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const ADMIN_EMAIL = 'admin@devents.com';
  const ADMIN_PASSWORD = 'admin123';

  const validate = () => {
    const errors = {};
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email address is invalid';
    }
    if (!password) {
      errors.password = 'Password is required';
    }
    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        console.log('Admin login successful');
        window.location.href = 'http://localhost:3002'; // Redirect to the desired URL
      } else {
        setErrors({ login: 'Invalid admin email or password' });
      }
    }
  };

  const handleBack = () => {
    navigate('/login'); // Redirect back to the Login.js page
  };

  return (
    <div className="login-container-ll">
      <div className="login-card-ll">
        <div className="logo-ll">Devents</div>
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          {errors.email && <div className="error">{errors.email}</div>}
          <div className="form-group-ll">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
          </div>
          {errors.password && <div className="error">{errors.password}</div>}
          <div className="form-group-ll">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
          </div>
          <button type="submit" className="login-btn-ll">Login</button>
        </form>
        <button className="signup-btn-ll" onClick={handleBack}>Back</button>
        <div className="footer-logo-l">D</div>
      </div>
    </div>
  );
}

export default AdminLogin;