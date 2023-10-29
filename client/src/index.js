import React from 'react';
import ReactDOM from 'react-dom/client';
import "./config/firebase-config";
import Authentication from './api/modules/Authentication/components/Authentication';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
  <Authentication/>
  </React.StrictMode>
);