// react
import {React , useState} from 'react';
import { NavLink } from 'react-router-dom';


// react icons
import { MdAccountCircle } from 'react-icons/md';
import { TiThMenu  } from 'react-icons/ti';

// style sheet
import './NavigationBarStyle.css';
import '../../globalStyle.css'

export default function NavigationBar() {

  // hide/show mobileMenu
  const [navView, setNav] = useState(false)

  const showMenu = () => setNav(!navView)

  // visual componets
  return (
    <header className={"navBar"}>
      <div className="logo">
        <NavLink to="/" className="logoLink">Indie Radio<span className="dot">.</span></NavLink>
      </div>

      {/* menu for desktop view */}
      <nav>
        <ul className="navMenu">
          {/* temp removal of live now as currently unrequired */}
          {/* <li><NavLink to="/liveNow" activeclassname="active">Live Now</NavLink></li> */}
          <li><NavLink to="/showBrowser" activeclassname="active">Show Browser</NavLink></li> 
          <li><NavLink to="/localspotlight" activeclassname="active">Local Spotlight</NavLink></li>
        </ul>
      </nav>

      <div className="navIcons">
        <NavLink to="/login"> <MdAccountCircle className="icon" /> </NavLink>
      </div>

      {/* menu for mobile view */}
      <div className="hamburger">
        <TiThMenu className = "icon" onClick={showMenu} />
      </div>

      <div className={navView ? "mobileMenu active" : "mobileMenu"}>
        <ul className="mobileNav" onClick={showMenu}>
          <li><NavLink to="/liveNow" activeclassname="active">Live Now</NavLink></li>
          <li><NavLink to="/showBrowser" activeclassname="active">Show Browser</NavLink></li> 
          <li><NavLink to="/localspotlight" activeclassname="active">Local Spotlight</NavLink></li>
        </ul>
        <div className="mobileMenuBot">
          <div className="mobileNavIcons" onClick={showMenu}>
            <NavLink to="/login"> <MdAccountCircle className="icon" /> </NavLink>
          </div>          
        </div>
      </div>
    </header>
  );
}