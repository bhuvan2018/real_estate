import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Check if user exists in localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const userExists = registeredUsers.some(user => user.email === email);

    if (!userExists) {
      // Show the registration popup if user doesn't exist
      setShowRegisterPopup(true);
      return;
    }

    // Continue with login
    setError('');
    onLogin();
    navigate('/');
  };

  const closePopup = () => {
    setShowRegisterPopup(false);
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      {showRegisterPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3>Account Not Found</h3>
            <p>You need to register before you can log in.</p>
            <div className="popup-buttons">
              <button onClick={closePopup} className="secondary-button">Close</button>
              <button onClick={goToRegister} className="primary-button">Register Now</button>
            </div>
          </div>
        </div>
      )}

      <div className="login-content">
        <div className="login-left">
          <div className="overlay">
            <div className="welcome-text">
              <h1>Welcome to the Real Estate</h1>
              <p>Find your dream home with us</p>
            </div>
          </div>
        </div>
        
        <div className="login-right">
          <div className="login-form-container">
            <div className="logo">
              <h2>Real <span>Estates</span></h2>
            </div>
            
            <h3>Sign in to your account</h3>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
              
              <div className="form-options">
                <div className="remember-me">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember me</label>
                </div>
              </div>
              
              <button type="submit" className="login-button">Sign In</button>
              
              <div className="login-footer">
                <p>Don't have an account? <Link to="/register">Create an account</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;