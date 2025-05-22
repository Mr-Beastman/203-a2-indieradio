import React from 'react'
import { Routes, Route } from 'react-router-dom'

// importing gloabalStyle
import './globalStyle.css'

// importing components
import NavigationBar from './components/navigationBar/NavigationBar'
import Footer from './components/footer/Footer'

// importing pages
import Home from './pages/home/Home'
import ArtistPage from './pages/artistPage/ArtistPage'
import LocalSpotlight from './pages/localSpotlight/LocalSpotlight'
import Registration from './pages/entry/registration/Registration'
import Login from './pages/entry/login/Login'


// main app
function App() {
  return (
    <div className="app">
      <NavigationBar/>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artist" element={<ArtistPage />} />
          <Route path="/localSpotlight" element={<LocalSpotlight />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
