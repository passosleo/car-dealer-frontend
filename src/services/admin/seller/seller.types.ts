import { CallbackFns } from "@/services/types";

export type SellerDTO = {
  id: string;
  name: string;
  email: string;
  phone: string;
  isEnabled: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
};

export type CreateSellerDTO = {
  name: string;
  email: string;
  phone: string;
};

export type UpdateSellerDTO = {
  name: string;
  email: string;
  phone: string;
  isEnabled: boolean;
};

export interface ISellerService {
  getSellers(callbackFns?: CallbackFns<SellerDTO[]>): Promise<SellerDTO[]>;
  getSeller(
    id: number,
    callbackFns?: CallbackFns<SellerDTO>
  ): Promise<SellerDTO>;
  createSeller(
    data: CreateSellerDTO,
    callbackFns?: CallbackFns<SellerDTO>
  ): Promise<SellerDTO>;
  updateSeller(
    id: string,
    data: UpdateSellerDTO,
    callbackFns?: CallbackFns<SellerDTO>
  ): Promise<SellerDTO>;
  deleteSeller(id: string, callbackFns?: CallbackFns<void>): Promise<void>;
}
