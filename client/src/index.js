import React, { useState } from 'react';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import App from './App.jsx'; 
import API from './api';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return (
    <div>
      {!token ? (
        <>
          <RegisterPage />
          <LoginPage setToken={setToken} />
        </>
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default App;
