import { useCookies } from "@/hooks/use-cookies";
import axios from "axios";
import { SellerServiceAxios } from "./admin/seller/seller-service-axios";
import { ISellerService } from "./admin/seller/seller.types";
import { IAuthService } from "./admin/auth/auth.type";
import { AuthServiceAxios } from "./admin/auth/auth-service-axios";
import { isTokenValid } from "@/utils/jwt";
import { useSession } from "@/hooks/use-session";
import { CustomInternalAxiosRequestConfig } from "./types";

const baseURL = "https://car-dealer-backend-lake.vercel.app/api/v1";

const apiInstanceAdmin = axios.create({
  baseURL: `${baseURL}/admin`,
});

apiInstanceAdmin.interceptors.request.use(
  async (config: CustomInternalAxiosRequestConfig) => {
    if (config.skipAuthInterceptor) {
      return config;
    }

    const { getCookie } = useCookies();
    const session = useSession();

    const accessToken = getCookie<string>("accessToken");
    if (accessToken && isTokenValid(accessToken)) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    }

    const refreshToken = getCookie<string>("refreshToken");
    if (refreshToken && isTokenValid(refreshToken)) {
      const data = await api.admin.auth.refreshSession(refreshToken);
      session.register(data);
      config.headers.Authorization = `Bearer ${data.accessToken}`;
    }

    return config;
  }
);

// const apiInstancePublic = axios.create({
//   baseURL: `${baseURL}/public`,
// });

export const api: {
  admin: {
    auth: IAuthService;
    seller: ISellerService;
  };
  public: {
    layout: string;
  };
} = {
  admin: {
    auth: new AuthServiceAxios(apiInstanceAdmin.getUri(), apiInstanceAdmin),
    seller: new SellerServiceAxios(apiInstanceAdmin.getUri(), apiInstanceAdmin),
  },
  public: {
    layout: "default",
  },
};
