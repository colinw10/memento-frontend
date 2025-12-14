/**
 * Auth Context
 * 🟠 CRYSTAL's Task (Part of Auth Forms - Size: M)
 * 
 * Provides authentication state to the entire app.
 * Manages user login/logout and token persistence.
 */

import { createContext, useContext, useState, useEffect } from 'react';
import { login as loginAPI, signup as signupAPI, verifyToken } from '../services/authService';

// Create the context
const AuthContext = createContext(null);

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider component
export const AuthProvider = ({ children }) => {
  // TODO: Set up state
  // PSEUDOCODE:
  // - user: null (will hold user object when logged in)
  // - loading: true (for initial auth check)
  // - error: null (for auth errors)

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // TODO: Check for existing token on mount
  // PSEUDOCODE:
  // useEffect(() => {
  //   1. Define async function checkAuth:
  //      - Get token from localStorage
  //      - If no token, setLoading(false) and return
  //      - Try to verify token with verifyToken()
  //      - If valid, setUser(response.user)
  //      - If error, clear localStorage token
  //      - Finally, setLoading(false)
  //   2. Call checkAuth()
  // }, [])

  useEffect(() => {
    const checkAuth = async () => {
      // TODO: Get token from localStorage
      // TODO: If no token, setLoading(false) and return early
      // TODO: Try verifyToken() and setUser if valid
      // TODO: Catch errors and clear bad token
      // TODO: Finally setLoading(false)
    };
    
    checkAuth();
  }, []);


  // TODO: Implement login function
  // PSEUDOCODE:
  // 1. Clear any previous errors
  // 2. Call loginAPI with credentials
  // 3. Store token in localStorage
  // 4. Set user state
  // 5. Return success or throw error

  const login = async (credentials) => {
    // TODO: setError(null)
    // TODO: Call loginAPI(credentials)
    // TODO: localStorage.setItem('token', response.token)
    // TODO: setUser(response.user)
    // TODO: Return response
  };


  // TODO: Implement signup function
  // PSEUDOCODE:
  // 1. Clear any previous errors
  // 2. Call signupAPI with userData
  // 3. Store token in localStorage
  // 4. Set user state
  // 5. Return success or throw error

  const signup = async (userData) => {
    // TODO: setError(null)
    // TODO: Call signupAPI(userData)
    // TODO: localStorage.setItem('token', response.token)
    // TODO: setUser(response.user)
    // TODO: Return response
  };


  // TODO: Implement logout function
  // PSEUDOCODE:
  // 1. Remove token from localStorage
  // 2. Set user to null
  // 3. Optionally redirect to home

  const logout = () => {
    // TODO: localStorage.removeItem('token')
    // TODO: setUser(null)
  };


  // Value object to provide
  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
