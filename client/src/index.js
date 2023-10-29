import React from 'react';
import ReactDOM from 'react-dom/client';
import "./config/firebase-config";
import Login from './Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Login/>
  </React.StrictMode>
);