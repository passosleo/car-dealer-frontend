import { ApiResponse, DefaultFilters, Paginated } from "./../../types.d";
import { AxiosInstance } from "axios";
import { Service } from "../../service";
import { CallbackFns } from "@/services/types";
import {
  BrandDTO,
  CreateBrandDTO,
  IBrandService,
  UpdateBrandDTO,
} from "./brand.types";

export class BrandServiceAxios extends Service implements IBrandService {
  private readonly instance: AxiosInstance;

  constructor(baseUrl: string, instance: AxiosInstance) {
    super(baseUrl);
    this.instance = instance;
  }

  public async getBrands(
    filters: DefaultFilters,
    callbackFns: CallbackFns<Paginated<BrandDTO[]>>
  ): Promise<Paginated<BrandDTO[]>> {
    try {
      const { data: res } = await this.instance.get<
        ApiResponse<Paginated<BrandDTO[]>>
      >(this.buildUrlWithQueryParams("/brand", filters));
      callbackFns?.onSuccess?.(res.data);
      return res.data;
    } catch (error) {
      callbackFns?.onError?.(error as Error);
      throw error;
    }
  }

  public async getBrandById(
    id: number,
    callbackFns: CallbackFns<BrandDTO>
  ): Promise<BrandDTO> {
    try {
      const { data: res } = await this.instance.get<ApiResponse<BrandDTO>>(
        `/brand/${id}`
      );
      callbackFns?.onSuccess?.(res.data);
      return res.data;
    } catch (error) {
      callbackFns?.onError?.(error as Error);
      throw error;
    }
  }

  public async createBrand(
    data: CreateBrandDTO,
    callbackFns: CallbackFns<BrandDTO>
  ): Promise<BrandDTO> {
    try {
      const { data: res } = await this.instance.post<ApiResponse<BrandDTO>>(
        "/brand",
        data
      );
      callbackFns?.onSuccess?.(res.data);
      return res.data;
    } catch (error) {
      callbackFns?.onError?.(error as Error);
      throw error;
    }
  }

  public async updateBrand(
    id: string,
    data: UpdateBrandDTO,
    callbackFns: CallbackFns<BrandDTO>
  ): Promise<BrandDTO> {
    try {
      const { data: res } = await this.instance.put<ApiResponse<BrandDTO>>(
        `/brand/${id}`,
        data
      );
      callbackFns?.onSuccess?.(res.data);
      return res.data;
    } catch (error) {
      callbackFns?.onError?.(error as Error);
      throw error;
    }
  }

  public async deleteBrand(
    id: string,
    callbackFns: CallbackFns<void>
  ): Promise<void> {
    try {
      await this.instance.delete(`/brand/${id}`);
      callbackFns?.onSuccess?.();
    } catch (error) {
      callbackFns?.onError?.(error as Error);
      throw error;
    }
  }
}
