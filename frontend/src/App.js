import React from 'react';
import { Routes, Route } from 'react-router-dom';

import NavigationBar from './components/navigationBar/NavigationBar';
import Home from './pages/home/Home';
import ArtistPage from './pages/artistPage/ArtistPage';

import './style.css';
import './globalStyle.css';

function App() {
  return (
    <>
      <NavigationBar />

      {/* define routes to allow for page navigaton */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artist" element={<ArtistPage />} />
      </Routes>

      <footer>
        &copy; 2025 Indie Radio — Built by Shav Narayan & Benjamin Eastman
      </footer>
    </>
  );
}

export default App;