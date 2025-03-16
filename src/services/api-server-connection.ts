import axios from "axios";
import { API_BASE_URL, APIConnection } from "./api";
import { CustomInternalAxiosRequestConfig } from "./types";
import { isTokenValid } from "@/utils/jwt";
import { useServerSession } from "@/hooks/use-server-session";

export const apiServerInstanceAdmin = axios.create({
  baseURL: `${API_BASE_URL}/admin`,
});

apiServerInstanceAdmin.interceptors.request.use(
  async (config: CustomInternalAxiosRequestConfig) => {
    if (config.skipAuthInterceptor) {
      return config;
    }

    const session = await useServerSession();
    const { accessToken } = await session.getTokens();

    if (accessToken && isTokenValid(accessToken)) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    }

    return config;
  }
);

export const apiServerConnection = new APIConnection(
  apiServerInstanceAdmin.getUri(),
  apiServerInstanceAdmin
);
