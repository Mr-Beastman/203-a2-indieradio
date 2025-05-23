import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { UserProvider, useAuth } from './context/UserContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AudioPlayer from './components/audioPlayer/AudioPlayer';
import './App.css';

// Navigation component with authentication status
function Navigation() {
  const { user, logout } = useAuth();

  return (
    <nav className="main-nav">
      <div className="nav-brand">
        <Link to="/">IndieRadio</Link>
      </div>
      <div className="nav-links">
        {user ? (
          <>
            <span className="welcome-text">
              Welcome, {user.username}
              {user.role === 'dj' && <span className="dj-badge">DJ</span>}
            </span>
            <button onClick={logout} className="nav-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

// Home component
function Home() {
  const { user } = useAuth();
  
  return (
    <div className="home-container">
      <h1>Welcome to IndieRadio</h1>
      {user ? (
        <p>Tune in to your favorite shows!</p>
      ) : (
        <p>Please login or register to access all features.</p>
      )}
    </div>
  );
}

// AppContent component to use auth context
function AppContent() {
  return (
    <div className="app">
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/dj-dashboard" 
            element={
              <ProtectedRoute roles={['dj']}>
                <div>DJ Dashboard (Coming Soon)</div>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      <AudioPlayer />
    </div>
  );
}

// Main App component
function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
