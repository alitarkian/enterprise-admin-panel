import axios from "axios";
import { API_ENDPOINTS } from "./endpoints";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const locale = localStorage.getItem("locale") || "en";
      const schemaName = process.env.NEXT_PUBLIC_DEFAULT_LANDING || "public";

      config.headers["Accept-Language"] = locale;
      config.headers["X-Tenant-Schema"] = schemaName;
    } else {
      config.headers["Accept-Language"] = "en";
      config.headers["X-Tenant-Schema"] = "public";
    }
    config.headers["X-Client-ID"] = process.env.NEXT_PUBLIC_CLIENT_ID || "";
    config.headers["X-Client-Secret"] =
      process.env.NEXT_PUBLIC_CLIENT_SECRET || "";

    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        await axiosClient.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN);
        return axiosClient(original);
      } catch (error) {
        console.warn("Session expired");
      }
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
