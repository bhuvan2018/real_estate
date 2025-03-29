import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

const Register = ({ onRegister }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // Password strength calculator
  const calculatePasswordStrength = (pass) => {
    if (!pass) return '';
    
    // Simple strength calculation
    if (pass.length < 6) return 'weak';
    if (pass.length < 10) return 'medium';
    if (pass.length >= 10) return 'strong';
    
    return 'medium';
  };

  const passwordStrength = calculatePasswordStrength(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate all fields
    if (!fullName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    // Validate password length
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Check if user already exists
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    if (registeredUsers.some(user => user.email === email)) {
      setError('This email is already registered');
      return;
    }

    // Save the new user
    const newUser = {
      fullName,
      email,
      password, // In a real app, you would hash this password
      registeredOn: new Date().toISOString()
    };
    
    const updatedUsers = [...registeredUsers, newUser];
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

    // Clear any previous errors
    setError('');
    // Call the registration handler passed from parent
    onRegister();
    // Navigate to home page after successful registration
    navigate('/');
  };

  const nextStep = () => {
    if (step === 1) {
      if (!fullName || !email) {
        setError('Please complete all fields');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address');
        return;
      }
      setError('');
      setStep(2);
    }
  };

  const prevStep = () => {
    setStep(1);
    setError('');
  };

  return (
    <div className="register-container">
      <div className="register-content">
        <div className="register-left">
          <div className="overlay">
            <div className="welcome-text">
              <h1>Join Real Estate Today</h1>
              <p>Create an account to find your dream home and get personalized property recommendations</p>
            </div>
          </div>
        </div>
        
        <div className="register-right">
          <div className="register-form-container">
            <div className="logo">
              <h2>Real <span>Estates</span></h2>
            </div>
            
            <h3>Create a new account</h3>
            
            {error && <div className="error-message">{error}</div>}
            
            {/* Progress indicators */}
            <div className="progress-container">
              <div className="progress-steps">
                <div className={`step ${step >= 1 ? 'active' : ''}`}>
                  1
                  <div className="step-label">Account</div>
                </div>
                <div className={`step ${step >= 2 ? 'active' : ''}`}>
                  2
                  <div className="step-label">Security</div>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="register-form">
              {step === 1 && (
                <>
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                      type="text"
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <button type="button" onClick={nextStep} className="register-button">Continue</button>
                </>
              )}
              
              {step === 2 && (
                <>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
                    />
                    {password && (
                      <>
                        <div className="password-strength">
                          <div className={`strength-meter ${passwordStrength}`}></div>
                        </div>
                        <div className="password-hint">
                          {passwordStrength === 'weak' && 'Weak password. Use at least 6 characters.'}
                          {passwordStrength === 'medium' && 'Medium strength. Add more characters for stronger password.'}
                          {passwordStrength === 'strong' && 'Strong password!'}
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                    />
                  </div>
                  
                  <div className="form-options">
                    <div className="remember-me">
                      <input type="checkbox" id="terms" />
                      <label htmlFor="terms">I agree to the Terms & Conditions</label>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="button" onClick={prevStep} className="register-button" style={{ backgroundColor: '#f1f1f1', color: '#333' }}>Back</button>
                    <button type="submit" className="register-button">Create Account</button>
                  </div>
                </>
              )}
              
              <div className="register-footer">
                <p>Already have an account? <Link to="/login">Sign in</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;