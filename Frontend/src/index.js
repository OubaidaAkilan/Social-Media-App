import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { DarkModeContextProvider } from './context/DarkModeContext';
import { AuthContextProvider } from './context/AuthContext';
import { ModalContextProvider } from './context/ModalContext';
import { LoadMoreItemsContextProvider } from './context/LoadMoreItemsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <DarkModeContextProvider>
    <AuthContextProvider>
      <ModalContextProvider>
        <LoadMoreItemsContextProvider>
          <App />
        </LoadMoreItemsContextProvider>
      </ModalContextProvider>
    </AuthContextProvider>
  </DarkModeContextProvider>
);
