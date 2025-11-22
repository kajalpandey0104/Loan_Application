import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token before every request EXCEPT register & login
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // Do NOT send token for register or login
    if (
      config.url === "/auth/register" ||
      config.url === "/auth/login"
    ) {
      return config;
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
