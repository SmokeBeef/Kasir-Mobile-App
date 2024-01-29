import axios, { Axios, AxiosError } from "axios";
import { getItem, setItem } from "./storage";
import { loginResponse } from "../types";
import { refreshTokenResponse } from "../types/response";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseUrl =
  process.env.PUBLIC_EXPO_BASE_URL ||
  "https://kasir-backend-nestjs-production.up.railway.app";

const axiosInterceptor = axios.create();
axiosInterceptor.interceptors.request.use(
  async (config) => {
    const dateNow = Date.now();
    const expiresToken = (await getItem("expiresToken")) || dateNow;
    if (+expiresToken >= dateNow) {
      try {
        const result = await axios.get<refreshTokenResponse>(
          `${baseUrl}/auth/refresh`
        );
        await setItem("token", result.data.data.token);
        await setItem("expires", result.data.data.expires);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 401) await AsyncStorage.clear();
        }
      }
    }
    config.withCredentials = true;
    return config;
  },
  (err) => {
    console.log("ini error interceptor", err);

    return Promise.reject(err);
  }
);

export { axiosInterceptor };
