import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://jobportal-h5m6.onrender.com/api/v1",
  withCredentials: true, // ✅ send cookies automatically
});

export default axiosInstance;
