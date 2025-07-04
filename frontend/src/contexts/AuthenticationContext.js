import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
  const [userType, setUserType] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.username);
        setUserType(decoded.userType);
        setIsLoggedIn(true);
      } catch (e) {
        console.error('Invalid token', e);
        localStorage.removeItem('authToken');
      }
    }
  }, []);

  const logIn = (token) => {
    console.log(token)
    localStorage.setItem('authToken', token);
    const decoded = jwtDecode(token);
    setUsername(decoded.username);
    setUserType(decoded.userType);
    setIsLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('authToken');
    setUsername(null)
    setIsLoggedIn(false);
    setUserType(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut, userType, username }}>
      {children}
    </AuthContext.Provider>
  );
}

// hook for ease of use
export function useAuth() {
  return useContext(AuthContext);
}
