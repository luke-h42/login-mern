import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function ProtectedRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    // Perform an API request to check if the user is authenticated
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
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}