import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token: string | undefined = localStorage.token;

  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, Promise.reject);

api.interceptors.response.use(
  (res) => res,
  (e: AxiosError) => {
    if (e.response && e.response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }

    return Promise.reject(e);
  },
);

export { api };
