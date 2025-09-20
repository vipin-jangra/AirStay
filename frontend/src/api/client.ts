import axios from "axios";

console.log(import.meta.env.VITE_API_URL);
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

export default API;
