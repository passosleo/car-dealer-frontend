import axios from "axios";
import { API_BASE_URL, APIConnection } from "./api";
import { CustomInternalAxiosRequestConfig } from "./types";
import { isTokenValid } from "@/utils/jwt";
import { AuthServiceAxios } from "./admin/auth/auth-service-axios";
import { useServerSession } from "@/hooks/use-server-session";

const apiServerInstanceAdmin = axios.create({
  baseURL: `${API_BASE_URL}/admin`,
});

const authService = new AuthServiceAxios(
  apiServerInstanceAdmin.getUri(),
  apiServerInstanceAdmin
);

apiServerInstanceAdmin.interceptors.request.use(
  async (config: CustomInternalAxiosRequestConfig) => {
    if (config.skipAuthInterceptor) {
      return config;
    }

    const session = await useServerSession();
    const { accessToken, refreshToken } = await session.getTokens();

    if (accessToken && isTokenValid(accessToken.value)) {
      config.headers.Authorization = `Bearer ${accessToken.value}`;
      return config;
    }

    if (refreshToken && isTokenValid(refreshToken.value)) {
      const data = await authService.refreshSession(refreshToken.value);
      session.register(data);
      config.headers.Authorization = `Bearer ${data.accessToken}`;
      return config;
    }

    session.invalidate();
    return config;
  }
);

export const apiServerConnection = new APIConnection(
  apiServerInstanceAdmin.getUri(),
  apiServerInstanceAdmin
);
