import axios, { AxiosInstance } from "axios";
import { BASE_URL, endpoints } from ".";
import { useAuthStore } from "@/store";
import { error } from "console";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
      // Setting global Authorization token
    } else {
      console.log("No accessToken available for request to:", config.url);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: any) => response,
  async (error) => {
    console.log("Response error:", error?.response?.status, error?.config?.url);

    if (
      error?.response?.status === 401 &&
      useAuthStore.getState().accessToken
    ) {
      ("Unauthorized error detected, attempting token refresh");

      try {
        // const { data } = await axiosInstance.get(endpoints.auth.refreshToken);
        // const newAccessToken = data.authorization.token;
        // useAuthStore.getState().login(newAccessToken);
        // const originalRequest = error.config;
        // originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        // return axios(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        useAuthStore.getState().logout();
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
