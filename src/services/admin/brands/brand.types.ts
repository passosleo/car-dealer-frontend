import { CallbackFns, DefaultFilters, Paginated } from "@/services/types";

export type BrandDTO = {
  brandId: string;
  name: string;
  imageUrl: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateBrandDTO = {
  name: string;
  imageUrl: string;
  active: boolean;
};

export type UpdateBrandDTO = {
  name: string;
  imageUrl: string;
  active: boolean;
};

export interface IBrandService {
  getBrands(
    filters?: DefaultFilters,
    callbackFns?: CallbackFns<Paginated<BrandDTO[]>>
  ): Promise<Paginated<BrandDTO[]>>;
  getBrandById(
    id: number,
    callbackFns?: CallbackFns<BrandDTO>
  ): Promise<BrandDTO>;
  createBrand(
    data: CreateBrandDTO,
    callbackFns?: CallbackFns<BrandDTO>
  ): Promise<BrandDTO>;
  updateBrand(
    id: string,
    data: UpdateBrandDTO,
    callbackFns?: CallbackFns<BrandDTO>
  ): Promise<BrandDTO>;
  deleteBrand(id: string, callbackFns?: CallbackFns<void>): Promise<void>;
}
