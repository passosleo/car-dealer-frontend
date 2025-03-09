import { AxiosInstance } from "axios";
import { Service } from "../../service";
import {
  CallbackFns,
  CreateSellerDTO,
  SellerDTO,
  SellerService,
  UpdateSellerDTO,
} from "./seller.types";

export class SellerServiceAxios extends Service implements SellerService {
  private readonly instance: AxiosInstance;

  constructor(baseUrl: string, instance: AxiosInstance) {
    super(baseUrl);
    this.instance = instance;
  }

  public async getSellers(
    callbackFns: CallbackFns<SellerDTO[]>
  ): Promise<SellerDTO[]> {
    try {
      const response = await this.instance.get<SellerDTO[]>(
        `${this.baseUrl}/admin/sellers`
      );
      callbackFns?.onSuccess?.(response.data);
      return response.data;
    } catch (error) {
      callbackFns?.onError?.(error as Error);
      throw error;
    }
  }
  public async getSeller(
    id: number,
    callbackFns: CallbackFns<SellerDTO>
  ): Promise<SellerDTO> {
    try {
      const response = await this.instance.get<SellerDTO>(
        `${this.baseUrl}/admin/sellers/${id}`
      );
      callbackFns?.onSuccess?.(response.data);
      return response.data;
    } catch (error) {
      callbackFns?.onError?.(error as Error);
      throw error;
    }
  }

  public async createSeller(
    data: CreateSellerDTO,
    callbackFns: CallbackFns<SellerDTO>
  ): Promise<SellerDTO> {
    try {
      const response = await this.instance.post<SellerDTO>(
        `${this.baseUrl}/admin/sellers`,
        data
      );
      callbackFns?.onSuccess?.(response.data);
      return response.data;
    } catch (error) {
      callbackFns?.onError?.(error as Error);
      throw error;
    }
  }

  public async updateSeller(
    id: string,
    data: UpdateSellerDTO,
    callbackFns: CallbackFns<SellerDTO>
  ): Promise<SellerDTO> {
    try {
      const response = await this.instance.put<SellerDTO>(
        `${this.baseUrl}/admin/sellers/${id}`,
        data
      );
      callbackFns?.onSuccess?.(response.data);
      return response.data;
    } catch (error) {
      callbackFns?.onError?.(error as Error);
      throw error;
    }
  }

  public async deleteSeller(
    id: string,
    callbackFns: CallbackFns<void>
  ): Promise<void> {
    try {
      await this.instance.delete(`${this.baseUrl}/admin/sellers/${id}`);
      callbackFns?.onSuccess?.();
    } catch (error) {
      callbackFns?.onError?.(error as Error);
      throw error;
    }
  }
}
