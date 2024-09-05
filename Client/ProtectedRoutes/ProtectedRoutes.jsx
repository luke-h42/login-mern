import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function ProtectedRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Simulate delay for loading state visibility
    const loadingTimeout = setTimeout(() => {
      setShowLoading(false);
    }, 300); // Show loading state for at least 300ms

    // Check authentication
    axios.get('/authentication', { withCredentials: true })
      .then(response => {
        setIsAuthenticated(true);
      })
      .catch(error => {
        setIsAuthenticated(false);
      })
      .finally(() => {
        // Clear timeout if authentication check is complete
        clearTimeout(loadingTimeout);
      });
  }, []);

  if (showLoading) {
    // Display loading state while waiting for authentication check
    return (
      <div className="flex items-center justify-center flex-col h-[calc(100vh-40px)] bg-white dark:bg-gray-900">
        <div className="text-5xl text-gray-700 dark:text-gray-300">Loading...</div>
      </div>
    );
  }

  // After loading state, render based on authentication status
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}