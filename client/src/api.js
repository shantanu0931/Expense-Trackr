import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // Replace this with your actual API base URL
  timeout: 10000, // Set a timeout for requests if needed
  // Other configuration options can be added here
});

export default api;
