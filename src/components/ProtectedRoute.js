import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from './UserContext';
import LoadingScreen from './LoadingScreen';

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

const removeSessionIdFromCookies = () => {
  document.cookie = "sessionid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

const isAuthenticated = async () => {
  const userToken = localStorage.getItem('userToken');
  const sessionId = getSessionIdFromCookies();

  if (userToken && sessionId) {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/verify-token`, {}, {
        headers: { 'Authorization': `Bearer ${userToken}` }
      });
      return response.status === 200;
    } catch (error) {
      localStorage.removeItem('userToken');
      removeSessionIdFromCookies();
      return false;
    }
  }
  return false;
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [isAuth, setIsAuth] = useState(null);
  const { userRole } = useUser();

  useEffect(() => {
    const checkAuth = async () => {
      const result = await isAuthenticated();
      setIsAuth(result);
    };
    checkAuth();
  }, []);

  if (isAuth === null || userRole === null) {
    return <LoadingScreen/>;
  }

  if (!isAuth) {
    localStorage.removeItem('userToken');
    removeSessionIdFromCookies();
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
