import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:8000", // Define the base URL for all requests
});

export default api;
