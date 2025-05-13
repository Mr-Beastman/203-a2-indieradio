import React from 'react';
import { Routes, Route } from 'react-router-dom';

// impoting universal style guide
import './style.css';
import './globalStyle.css';

// importing components to build pages
import NavigationBar from './components/navigationBar/NavigationBar';
import Home from './pages/home/Home';
import ArtistPage from './pages/artistPage/ArtistPage';
import Footer from './components/footer/Footer';

function App() {
  return (
    <>
      {/* fixed navigationbar */}
      <NavigationBar />

      {/* define routes to allow for page navigaton */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artist" element={<ArtistPage />} />
      </Routes>

      {/* fixed footer */}
      <Footer />
    </>
  );
}

export default App;