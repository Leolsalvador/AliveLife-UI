import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function getSessionIdFromCookies() {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      const parts = cookie.split('=');
      if (parts[0] === 'sessionid') {
          return parts[1];
      }
  }
  return null;
}

const isAuthenticated = async () => {
  const userToken = localStorage.getItem('userToken');
  const sessionId = getSessionIdFromCookies();

  if (userToken && sessionId) {
    try {
      const response = await axios.post(`${API_BASE_URL}/pdf/auth/verify-token`, {}, {
        headers: { 'Authorization': `Bearer ${userToken}` }
      });
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }
  return false;
};

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await isAuthenticated();
      setIsAuth(result);
    };
    checkAuth();
  }, []);

  if (isAuth === null) {
    return <div>Loading...</div>;
  }

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
