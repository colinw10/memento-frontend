/**
 * Auth Service
 * 🟠 CRYSTAL's Task (Part of Auth Forms - Size: M)
 *
 * Handles all authentication API calls.
 */

import api from "./api";

// TODO: Implement signup function
// PSEUDOCODE:
// 1. Accept { username, email, password } as parameter
// 2. Make POST request to '/auth/signup' with the data
// 3. Return response.data

export const signup = async (userData) => {
  // TODO: POST to /auth/signup
  // TODO: Return response.data
};

// TODO: Implement login function
// PSEUDOCODE:
// 1. Accept { email, password } as parameter
// 2. Make POST request to '/auth/login' with the data
// 3. Return response.data (should contain { token, user })

export const login = async (credentials) => {
  // TODO: POST to /auth/login
  // TODO: Return response.data
};

// TODO: Implement verifyToken function
// PSEUDOCODE:
// 1. Make GET request to '/auth/verify'
// 2. The interceptor will automatically add the token
// 3. Return response.data (should contain { user })

export const verifyToken = async () => {
  // TODO: GET /auth/verify
  // TODO: Return response.data
};
