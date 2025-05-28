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
import ArtistPage from './pages/artistPage/ArtistPage'
import LocalSpotlight from './pages/localSpotlight/LocalSpotlight'
import Registration from './pages/entry/registration/Registration'
import Login from './pages/entry/login/Login'
import ShowBrowser from './pages/showBrowser/ShowBrowser'
import LiveNow from './pages/liveNow/LiveNow'


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
          <Route path="/artist" element={<ArtistPage />} />
          <Route path="/localSpotlight" element={<LocalSpotlight />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/djDashboard"  element={<DJDashboard />} />
          <Route path="/userDashboard"  element={<UserDashboard />} />
          <Route path="/ShowBrowser"  element={<ShowBrowser />} />
          <Route path="/liveNow"  element={<LiveNow />} />
        </Routes>
      </main>
      
      {/* foor component */}
      <Footer />
    </div>
  );
}

export default App;
