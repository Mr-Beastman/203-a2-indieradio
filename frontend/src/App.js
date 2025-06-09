import React from 'react'
import { Routes, Route } from 'react-router-dom'

// importing gloabalStyle
import './globalStyle.css'

// importing components
import NavigationBar from './components/navigationBar/NavigationBar'
import Footer from './components/footer/Footer'

// importing pages
import Home from './pages/home/Home'
import DJDashboard from './pages/dashboards/djDashboard/DJDashboard'
import UserDashboard from './pages/dashboards/listenerDashboard/ListenerDashboard'
import StationPage from './pages/stationPage/StationPage'
import ArtistSpotlight from './pages/ArtistSpotlight/ArtistSpotlight'
import Registration from './pages/entry/registration/Registration'
import Login from './pages/entry/login/Login'
import StationBrowser from './pages/stationBrowser/StationBrowser'


function App() {
  return (
    // building website display
    <div className="app">
      {/* header component */}
      <NavigationBar/>

      {/* creating routes for page navigation */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/station/:id" element={<StationPage />} />
          <Route path="/artistSpotlight" element={<ArtistSpotlight />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/djDashboard"  element={<DJDashboard />} />
          <Route path="/userDashboard"  element={<UserDashboard />} />
          <Route path="/stationBrowser"  element={<StationBrowser />} />
        </Routes>
      </main>
      
      {/* foor component */}
      <Footer />
    </div>
  );
}

export default App;
