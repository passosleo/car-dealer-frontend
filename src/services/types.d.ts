import { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

export type ApiResponse<T> = {
  statusCode: number;
  message: string;
  data: T;
};

export type Paginated<T> = {
  total: number;
  page: number;
  limit: number;
  items: T;
};

export type DefaultFilters = {
  page?: number;
  limit?: number;
  orderBy?: "asc" | "desc";
  search?: string;
  active?: boolean;
  createdAtStart?: string;
  createdAtEnd?: string;
  updatedAtStart?: string;
  updatedAtEnd?: string;
};

export type CallbackFns<T> = {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
};

export interface CustomInternalAxiosRequestConfig
  extends InternalAxiosRequestConfig {
  skipAuthInterceptor?: boolean;
}

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipAuthInterceptor?: boolean;
}
