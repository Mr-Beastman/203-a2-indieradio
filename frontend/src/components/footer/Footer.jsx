import React from 'react'
import { useNavigate } from 'react-router-dom';


import { useAuth } from '../../contexts/AuthenticationContext';

import './Footer.css'
import { captializeWord } from '../../utilities/utilities';

export default function Footer() {

  const { logOut, isLoggedIn, username } = useAuth();
  const navigate = useNavigate();

  const loginClicked = () => {
    navigate('/login');
  }

  const logoutClicked = () => {
    logOut();
    // pause navigation till after state change
    setTimeout(() => navigate('/'), 0);
  }

  return (
    <div className="footer">
        &copy; 2025 Indie Radio;
        {isLoggedIn ? (
          <p onClick={logoutClicked} >logout {captializeWord(username)}</p>
        ) : (
          <p onClick={loginClicked}>login</p>
          )
        }
    </div>
  )
}