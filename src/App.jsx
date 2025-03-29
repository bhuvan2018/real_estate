import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import UserHomePage from './components/UserHomePage';
import SellProperty from './components/SellProperty';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  const [properties, setProperties] = useState(JSON.parse(localStorage.getItem('properties')) || []);
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');

  const addProperty = (newProperty) => {
    const updatedProperties = [...properties, newProperty];
    setProperties(updatedProperties);
    localStorage.setItem('properties', JSON.stringify(updatedProperties));
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', 'false');
    // Redirect to login page happens via the route protection
  };

  // Protected route component
  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated && (
          <nav className="navbar">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/sell">Sell Property</a></li>
              <li><a href="/admin">Admin</a></li>
              <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
            </ul>
          </nav>
        )}

        <Routes>
          {/* Default route is login if not authenticated, otherwise home */}
          <Route path="/" element={
            isAuthenticated ? <UserHomePage properties={properties} /> : <Navigate to="/login" />
          } />
          
          {/* Login route - redirects to home if already authenticated */}
          <Route path="/login" element={
            !isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />
          } />
          
          {/* Register route - redirects to home if already authenticated */}
          <Route path="/register" element={
            !isAuthenticated ? <Register onRegister={handleRegister} /> : <Navigate to="/" />
          } />
          
          {/* Protected routes */}
          <Route path="/home" element={<ProtectedRoute element={<UserHomePage properties={properties} />} />} />
          <Route path="/sell" element={<ProtectedRoute element={<SellProperty addProperty={addProperty} />} />} />
          <Route path="/admin" element={<ProtectedRoute element={<AdminDashboard properties={properties} addProperty={addProperty} />} />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;