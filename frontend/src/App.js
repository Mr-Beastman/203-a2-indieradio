import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './style.css';
import './globalStyle.css';

import { AuthProvider, useAuth } from './context/AuthContext';
import NavigationBar from './components/navigationBar/NavigationBar';
import Footer from './components/footer/Footer';
import AudioPlayer from './components/audioPlayer/AudioPlayer';
import Home from './pages/home/Home';
import ArtistPage from './pages/artistPage/ArtistPage';
import LocalSpotlight from './pages/localspotlight/LocalSpotlight';
import DJDashboard from './pages/djdashboard/DJDashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// DJ Protected Route component
const DJProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || user.role !== 'dj') {
    return <Navigate to="/" replace />;
  }

  return children;
};

function AppContent() {
  return (
    <div className="app">
      <NavigationBar />
      <AudioPlayer />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artist" element={<ArtistPage />} />
          <Route path="/localspotlight" element={<LocalSpotlight />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route 
            path="/djdashboard" 
            element={
              <DJProtectedRoute>
                <DJDashboard />
              </DJProtectedRoute>
            } 
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
