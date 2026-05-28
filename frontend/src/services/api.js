import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const refresh = localStorage.getItem(REFRESH_TOKEN);
        const res = await axios.post(`${BASE_URL}/api/auth/token/refresh/`, {
          refresh,
        });
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        original.headers.Authorization = `Bearer ${res.data.access}`;
        return api(original);
      } catch (err) {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        window.location.href = "/login/";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
