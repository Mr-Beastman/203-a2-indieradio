import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './NavigationBarStyle.css';

export default function NavigationBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-brand">
        <Link to="/" className="logo">IndieRadio</Link>
      </div>

      <button className="mobile-menu-button" onClick={toggleMobileMenu}>
        <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}></span>
      </button>

      <div className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
        <Link to="/artist" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Artists</Link>
        <Link to="/localspotlight" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Local Spotlight</Link>
        {user?.role === 'dj' && (
          <Link to="/djdashboard" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>DJ Dashboard</Link>
        )}
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="user-menu">
            <span className="username">Welcome, {user.username}</span>
            <button className="auth-button" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="auth-button">Login</Link>
            <Link to="/register" className="auth-button">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
