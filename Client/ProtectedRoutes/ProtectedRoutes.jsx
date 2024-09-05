import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function ProtectedRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null for loading state
  const [loading, setLoading] = useState(true); // Start with loading true

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Perform the authentication check
        await axios.get('/authentication', { withCredentials: true });
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        // Ensure loading is hidden after 300ms, but not before authentication check completes
        const loadingTimeout = setTimeout(() => {
          setLoading(false);
        }, 300);

        // Clear timeout if authentication check completes before timeout
        clearTimeout(loadingTimeout);
      }
    };

    // Start the authentication check
    checkAuth();
  }, []);

  if (loading) {
    // Show loading state while checking authentication
    return (
      <div className="flex items-center justify-center flex-col h-[calc(100vh-40px)] bg-white dark:bg-gray-900">
        <div className="text-5xl text-gray-700 dark:text-gray-300">Loading...</div>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
