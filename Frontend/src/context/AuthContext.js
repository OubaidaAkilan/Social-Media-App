import React, { createContext, useEffect, useState } from 'react';
import AxiosInstance from '../api/AxiosInstance';
import base64 from 'base-64';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  const login = async (inputs) => {
    //To DO
    const encodedBase64Token = base64.encode(
      `${inputs.email}:${inputs.password}`
    );
    const authorization = `Basic ${encodedBase64Token}`;

    const res = await AxiosInstance.post(
      '/login',
      {},
      {
        headers: {
          Authorization: authorization,
        },
      }
    );
    setCurrentUser(res.data);
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
