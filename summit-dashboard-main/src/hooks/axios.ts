import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";

// Safely get the token from localStorage
const getToken = (): string | null => {
  try {
    const data = JSON.parse(localStorage.getItem("recoil-persist") || "{}");
    return data?.auth?.token || null;
  } catch (err) {
    console.error("Error parsing token from localStorage:", err);
    return null;
  }
};

// Request Interceptor
axios.interceptors.request.use(
  (config: any) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);

      if (message.includes("jwt expired")) {
        localStorage.clear();
        sessionStorage.clear();
        window.location.replace("/login");
      }
    } else {
      toast.error("Network error. Please try again.");
    }

    return Promise.reject(error);
  }
);

export default axios;
