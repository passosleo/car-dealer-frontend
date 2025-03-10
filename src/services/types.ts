import { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

export type ApiResponse<T> = {
  statusCode: number;
  message: string;
  data: T;
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
