import axios from "axios";

// Create an Axios instance with default settings
const API = axios.create({
  baseURL: "http://localhost:7162/api", // Replace with your backend URL if different
  withCredentials: true, // Include credentials if needed (cookies)
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
