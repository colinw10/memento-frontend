/*
  This file sets up axios with interceptors for authentication.
  All API calls go through this configured instance.
 */

import axios from "axios";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});




api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // get token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // attach token
    }
    return config; // must return config
  },
  (error) => {
    return Promise.reject(error); // pass error forward
  }
);


// Response interceptor (handle 401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default api;

