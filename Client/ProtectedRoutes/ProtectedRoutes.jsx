import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function ProtectedRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setShowLoading(false);
    }, 300);

    axios.get('/authentication', { withCredentials: true })
      .then(response => {
        setIsAuthenticated(true);
      })
      .catch(error => {
        console.error("Error fetching authentication", error);
        setIsAuthenticated(false);
      })
      .finally(() => {
        clearTimeout(loadingTimeout);
      });

    return () => clearTimeout(loadingTimeout); // Cleanup
  }, []);

  if (showLoading) {
    return (
      <div className="flex items-center justify-center flex-col h-[calc(100vh-40px)] bg-white dark:bg-gray-900">
        <div className="text-5xl text-gray-700 dark:text-gray-300">Loading...</div>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}