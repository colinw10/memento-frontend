/**
 * Auth Service
 * 🟠 CRISTAL's Task (Part of Auth Forms - Size: M)
 *
 * Handles all authentication API calls.
 */

import api from "./api";

// Implement signup function

export const signup = async (userData) => {
  console.log("Calling signup API", userData);
  const res = await api.post("/auth/signup", userData);
  return res.data;
};

// Implement login function

export const login = async (credentials) => {
  const res = await api.post("/auth/login", credentials);
  return res.data;
};

// Implement verifyToken function


export const verifyToken = async () => {
  const res = await api.get("/auth/verify");
  return res.data;
};
