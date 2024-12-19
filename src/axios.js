// src/axios.js
import axios from 'axios';

const baseURL = 'https://awa.gprlive.com/api/'; // Centralized API base URL

// Create axios instance
const apiClient = axios.create({
  baseURL, // This is the base URL for API requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Export baseURL for direct use and apiClient for axios requests
export { baseURL };
export default apiClient;
