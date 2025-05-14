import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './style.css';
import './globalStyle.css';

import NavigationBar from './components/navigationBar/NavigationBar';
import Footer from './components/footer/Footer';
import AudioPlayer from './components/audioPlayer/AudioPlayer';
import Home from './pages/home/Home';
import ArtistPage from './pages/artistPage/ArtistPage';
import LocalSpotlight from './pages/localspotlight/LocalSpotlight';
import Registration from './pages/registration/Registration';

function App() {
  return (
    <div className="app">
      <NavigationBar />
      <AudioPlayer /> {/* Always visible YouTube + audio stream player */}

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artist" element={<ArtistPage />} />
          <Route path="/localspotlight" element={<LocalSpotlight />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </main>
         <Footer />
    </div>
  );
}

export default App;
