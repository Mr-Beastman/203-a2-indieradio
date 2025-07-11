// react
import {React , useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthenticationContext';


// react icons
import { MdAccountCircle } from 'react-icons/md';
import { TiThMenu  } from 'react-icons/ti';

// style sheet
import './NavigationBarStyle.css';
import '../../globalStyle.css';

export default function NavigationBar() {

  // hide/show mobileMenu
  const [navView, setNav] = useState(false)

  const showMenu = () => setNav(!navView)

  const { isLoggedIn, userType } = useAuth();

  // visual componets
  return (
    <header className={"navBar"}>
      <div className="logo">
        <NavLink to="/" className="logoLink">Indie Radio<span className="dot">.</span></NavLink>
      </div>

      {/* menu for desktop view */}
      <nav>
        <ul className="navMenu">
          {isLoggedIn && (
            <NavLink to={userType === 'station' ? "/stationDashboard" : "/userDashboard"} activeclassname="active">Dashboard</NavLink>
          )}
          <li><NavLink to="/stationBrowser" activeclassname="active">Station Browser</NavLink></li> 
          <li><NavLink to="/artistSpotlight" activeclassname="active">Artist Spotlight</NavLink></li>
        </ul>
      </nav>

      <div className="navIcons">
        <NavLink to={
          isLoggedIn 
            ? (userType === 'station' ? '/stationDashboard' : '/userDashboard') 
            : '/login'
        }>
          <MdAccountCircle className="icon" />
        </NavLink>
      </div>

      {/* menu for mobile view */}
      <div className="hamburger">
        <TiThMenu className = "icon" onClick={showMenu} />
      </div>

      <div className={navView ? "mobileMenu active" : "mobileMenu"}>
        <ul className="mobileNav" onClick={showMenu}>
          {isLoggedIn && (
            <NavLink to={userType === 'station' ? "/stationDashboard" : "/userDashboard"} activeclassname="active">Dashboard</NavLink>
          )}
          <li><NavLink to="/stationBrowser" activeclassname="active">Station Browser</NavLink></li> 
          <li><NavLink to="/artistSpotlight" activeclassname="active">Artist Spotlight</NavLink></li>
        </ul>
        <div className="mobileMenuBot">
        <div className="mobileNavIcons">
          <NavLink to={
            isLoggedIn 
              ? (userType === 'station' ? '/stationDashboard' : '/userDashboard') 
              : '/login'
          }>
            <MdAccountCircle className="icon" />
          </NavLink>
        </div>         
        </div>
      </div>
    </header>
  );
}