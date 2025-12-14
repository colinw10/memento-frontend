/* 
 * Auth Context
 * 🟠 CRISTAL's Task (Part of Auth Forms - Size: M)
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
  // Set up state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // Check for existing token on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await verifyToken();
        setUser(data.user);
      } catch (err) {
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);


  // Implement login function
 
   const login = async (credentials) => {
    try {
      setError(null);
      const data = await loginAPI(credentials);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    }
  };

  // Implement signup function
  const signup = async (userData) => {
    try {
      setError(null);
      const data = await signupAPI(userData);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
      throw err;
    }
  };

  // Implement logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
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
