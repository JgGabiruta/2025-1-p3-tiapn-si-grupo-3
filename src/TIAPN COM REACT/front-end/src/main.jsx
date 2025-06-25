import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/login.css';  // garante que o login.css seja carregado globalmente

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
