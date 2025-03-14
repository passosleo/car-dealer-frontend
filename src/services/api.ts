import { AxiosInstance } from "axios";
import { SellerServiceAxios } from "./admin/seller/seller-service-axios";
import { ISellerService } from "./admin/seller/seller.types";
import { IAuthService } from "./admin/auth/auth.type";
import { AuthServiceAxios } from "./admin/auth/auth-service-axios";

export const API_BASE_URL = "https://car-dealer-backend-lake.vercel.app/api/v1";

export class APIConnection {
  protected readonly baseUrl: string;

  public readonly admin: {
    auth: IAuthService;
    seller: ISellerService;
  };
  public readonly public: {
    layout: string;
  };

  constructor(baseUrl: string, axiosInstance: AxiosInstance) {
    this.baseUrl = baseUrl;
    this.admin = {
      auth: new AuthServiceAxios(this.baseUrl, axiosInstance),
      seller: new SellerServiceAxios(this.baseUrl, axiosInstance),
    };
    this.public = {
      layout: "default",
    };
  }
}
