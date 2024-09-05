import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function ProtectedRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {

    axios.get('/authentication', { withCredentials: true })
      .then(response => {
        setIsAuthenticated(true);
      })
      .catch(error => {
        setIsAuthenticated(false);
      });
  }, []);

  if (isAuthenticated === null) {
    // Loading state while checking authentication
    return <div className="flex items-center justify-center flex-col h-[calc(100vh-40px)] bg-white dark:bg-gray-900">Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}