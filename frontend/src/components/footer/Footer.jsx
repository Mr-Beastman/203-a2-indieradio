import React from 'react'
import { useNavigate } from 'react-router-dom';


import { useAuth } from '../../contexts/AuthenticationContext';

import './Footer.css'

export default function Footer() {

  const { logOut, isLoggedIn } = useAuth();
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
          <p onClick={logoutClicked} >logout tester</p>
        ) : (
          <p onClick={loginClicked}>login tester</p>
          )
        }
    </div>
  )
}