import React from 'react'
import { useNavigate } from 'react-router-dom';


import { useAuth } from '../../contexts/AuthenticationContext';

import './FooterStyle.css'
import { captializeWord } from '../../utilities/utilities';

export default function Footer() {

  const { logOut, isLoggedIn, username } = useAuth();
  const navigate = useNavigate();

  const logoutClicked = () => {
    logOut();
    // pause navigation till after state change
    setTimeout(() => navigate('/'), 0);
  }

  return (
    <div className="footer">

        {isLoggedIn && (
          <h2 className='logout' onClick={logoutClicked} >logout {captializeWord(username)}</h2>
        )}
      &copy; 2025 Indie Radio;
    </div>
  )
}