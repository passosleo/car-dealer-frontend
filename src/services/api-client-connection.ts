import axios from "axios";
import { API_BASE_URL, APIConnection } from "./api";
import { CustomInternalAxiosRequestConfig } from "./types";
import { useClientSession } from "@/hooks/use-client-session";
import { isTokenValid } from "@/utils/jwt";
import { AuthServiceAxios } from "./admin/auth/auth-service-axios";

const apiClientInstanceAdmin = axios.create({
  baseURL: `${API_BASE_URL}/admin`,
});

const authService = new AuthServiceAxios(
  apiClientInstanceAdmin.getUri(),
  apiClientInstanceAdmin
);

apiClientInstanceAdmin.interceptors.request.use(
  async (config: CustomInternalAxiosRequestConfig) => {
    if (config.skipAuthInterceptor) {
      return config;
    }

    const session = useClientSession();
    const { accessToken, refreshToken } = session.getTokens();

    if (accessToken && isTokenValid(accessToken)) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    }

    if (refreshToken && isTokenValid(refreshToken)) {
      const data = await authService.refreshSession(refreshToken);
      session.register(data);
      config.headers.Authorization = `Bearer ${data.accessToken}`;
      return config;
    }

    session.invalidate();
    return config;
  }
);

export const apiClientConnection = new APIConnection(
  apiClientInstanceAdmin.getUri(),
  apiClientInstanceAdmin
);
