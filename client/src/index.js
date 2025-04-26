import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // ✅ Import App
import './index.css';     // ✅ Tailwind if you have it

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
