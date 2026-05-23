// import axios from "axios";

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "/api",
//   withCredentials: true, // Required for secure JWT cookies
// });

// export default API;


import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://church-website-1-c047.onrender.com/api",
  withCredentials: true,
});

export default API;