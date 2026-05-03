// import axios from "axios";

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "/api",
//   withCredentials: true, // Required for secure JWT cookies
// });

// export default API;


import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://church-website-bdsp.onrender.com",
  withCredentials: true,
});

export default API;