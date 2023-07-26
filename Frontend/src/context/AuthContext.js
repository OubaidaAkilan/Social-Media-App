import React, { createContext, useEffect, useState } from 'react';
import AxiosInstance from '../api/AxiosInstance';
import base64 from 'base-64';

import { Cookies } from 'react-cookie';
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const cookies = new Cookies();

  const DummyData = {
    city: 'Jo',
    coverPic: '1687439011094gg.jpg',
    email: 'Guest',
    name: 'Guest',
    profilePic: 'avatarImage.jpg',
    username: 'Guest',
    website: 'Guest',
    _id: 'Guest',
  };

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('userData')) || DummyData
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
    console.log(res);
    validateMyUser(res.data.userData, res.data.accessToken);
  };

  const validateMyUser = (data, token) => {
    if (data) {
      if (token) {
        setLoginState(true, data);

        // Set a cookie
        cookies.set('accessToken', token, {
          path: '/',
          expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
        });
      } else {
        setLoginState(false, currentUser);
      }
    } else {
      setLoginState(false, currentUser);
    }
  };

  const setLoginState = (isLogged, userData) => {
    setLoggedIn(isLogged);
    // console.log(userData, 444444);
    setCurrentUser(userData);
  };

  const logout = () => {
    setLoginState(false, DummyData);

    // Remove the cookie
    cookies.remove('accessToken', { path: '/' });
  };

  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    const accessToken = cookies.get('accessToken');
    validateMyUser(currentUser, accessToken);

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
