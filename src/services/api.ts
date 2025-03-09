import { useCookies } from "@/hooks/use-cookies";
import axios from "axios";
import { SellerServiceAxios } from "./admin/seller/seller-service-axios";
import { SellerService } from "./admin/seller/seller.types";

const baseURL = "http://localhost:3333/api/v1";

const apiInstanceAdmin = axios.create({
  baseURL: `${baseURL}/admin`,
});

apiInstanceAdmin.interceptors.request.use((config) => {
  const { getCookie } = useCookies();
  const token = getCookie("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// const apiInstancePublic = axios.create({
//   baseURL: `${baseURL}/public`,
// });

export const api: {
  admin: {
    seller: SellerService;
  };
  public: {
    layout: string;
  };
} = {
  admin: {
    seller: new SellerServiceAxios(baseURL, apiInstanceAdmin),
  },
  public: {
    layout: "default",
  },
};
