
import axios from "axios";

// Set VITE_API_URL in .env.local for a local backend or in the deploy
// environment for a different API. The default points to the deployed API.
const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "https://clientcare-backend.onrender.com/api"
).replace(/\/+$/, "");

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
