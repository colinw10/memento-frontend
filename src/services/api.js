/**
 * API Service Layer
 * 🟠 CRYSTAL's Task (Size: S)
 *
 * This file sets up axios with interceptors for authentication.
 * All API calls go through this configured instance.
 */

import axios from "axios";

// TODO: Create axios instance with base URL
// PSEUDOCODE:
// 1. Create axios instance with baseURL from environment variable
//    - Use import.meta.env.VITE_API_URL or fallback to 'http://localhost:5000/api'
// 2. Set default headers (Content-Type: application/json)

const api = axios.create({
  // TODO: Set baseURL here
  // TODO: Set headers here
});

// TODO: Add request interceptor to attach JWT token
// PSEUDOCODE:
// 1. api.interceptors.request.use((config) => { ... })
// 2. Inside the function:
//    - Get token from localStorage: localStorage.getItem('token')
//    - If token exists, add to headers: config.headers.Authorization = `Bearer ${token}`
//    - Return config
// 3. Handle errors in second callback

api.interceptors.request.use(
  (config) => {
    // TODO: Get token from localStorage
    // TODO: If token exists, add Authorization header
    // TODO: Return config
  },
  (error) => {
    // TODO: Return rejected promise with error
  }
);

// TODO: Add response interceptor to handle errors globally
// PSEUDOCODE:
// 1. api.interceptors.response.use((response) => response, (error) => { ... })
// 2. In error handler:
//    - If error.response.status === 401 (unauthorized):
//      - Clear token from localStorage
//      - Optionally redirect to login
//    - Return rejected promise with error

api.interceptors.response.use(
  (response) => {
    // TODO: Just return the response
  },
  (error) => {
    // TODO: Check if 401 error
    // TODO: If 401, clear localStorage token
    // TODO: Return rejected promise
  }
);

export default api;
