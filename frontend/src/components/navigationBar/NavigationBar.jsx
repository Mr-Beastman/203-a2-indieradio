import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationBarStyle.css';
import { MdAccountCircle } from 'react-icons/md';
import AudioPlayer from '../../components/audioPlayer/AudioPlayer';<AudioPlayer />

export default function NavigationBar() {
  return (
    <header className="navBar">
      <div className="logo">
        <NavLink to="/" className="logoLink">Indie Radio<span className="dot">.</span></NavLink>
      </div>

      <nav>
        <ul className="navMenu">
          <li><NavLink to="/artist" activeclassname="active">Stream</NavLink></li>
          <li><NavLink to="/localspotlight" activeclassname="active">Local Spotlight</NavLink></li>
          <li><NavLink to="/register" activeclassname="active">Register</NavLink></li>
          <li><NavLink to="/contact" activeclassname="active">Contact</NavLink></li>
        </ul>
      </nav>

      <div className="navIcons">
        <NavLink to="/register" title="Register or Login">
          <MdAccountCircle className="icon" />
        </NavLink>
      </div>
    </header>
  );
}