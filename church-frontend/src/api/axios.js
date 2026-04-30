import axios from "axios";

const API = axios.create({
  baseURL: "/api",
  withCredentials: true, // Required for secure JWT cookies
});

export default API;
