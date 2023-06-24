import React, { createContext, useEffect, useState } from 'react';
import AxiosInstance from '../api/AxiosInstance';
import base64 from 'base-64';
import { Cookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const cookies = new Cookies();

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('userData')) || null
  );

  const [loggedIn, setLoggedIn] = useState(false);

  const login = async (inputs) => {
    //To DO
    const encodedBase64Token = base64.encode(
      `${inputs.email}:${inputs.password}`
    );
    const authorization = `Basic ${encodedBase64Token}`;

    const res = await AxiosInstance.post(
      '/account/login',
      {},
      {
        headers: {
          Authorization: authorization,
        },
      }
    );
    validateMyUser(res.data);
  };

  const validateMyUser = (data) => {
    if (data) {
      const token = cookies.get('accessToken');

      const validUser = token ? jwtDecode(token) : null;
      if (validUser) {
        setLoginState(true, data);
      } else {
        setLoginState(false, currentUser);
      }
    } else {
      setLoginState(false, currentUser);
    }
  };

  const setLoginState = (isLogged, userData) => {
    setLoggedIn(isLogged);
    setCurrentUser(userData);
  };

  const logout =() =>{
    setLoginState(false, currentUser);
    cookies.remove('accessToken');
  }

  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(currentUser));
    
  }, [currentUser]);

  useEffect(() => {
    validateMyUser(currentUser);

    return () => {
      // Cleanup operations here
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login, loggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
