import React, { useState } from 'react';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import API from './api';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {token && (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded float-right m-2"
        >
          Logout
        </button>
      )}
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
