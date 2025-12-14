/**
 * Protected Route Component
 * 🟠 CRYSTAL's Task (Part of Auth Forms - Size: M)
 * 
 * Wraps routes that require authentication.
 * Redirects to login if user is not authenticated.
 */

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  // TODO: Get auth state from context
  // PSEUDOCODE:
  // 1. Get { isAuthenticated, loading } from useAuth()
  // 2. If loading, show a loading spinner or null
  // 3. If not authenticated, redirect to /login
  // 4. If authenticated, render children

  const { isAuthenticated, loading } = useAuth();

  // TODO: Show loading state while checking auth
  if (loading) {
    // TODO: Return loading indicator
    return <div>Loading...</div>;
  }

  // TODO: Redirect to login if not authenticated
  if (!isAuthenticated) {
    // TODO: Return Navigate component to /login
  }

  // TODO: Render protected content
  return children;
}

export default ProtectedRoute;
