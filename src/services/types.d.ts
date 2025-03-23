import type { AxiosError } from "axios";
import { routes } from "./router";

export type RouteName = keyof typeof routes;

export type DefaultFilters = {
  page?: number;
  limit?: number;
  orderBy?: "asc" | "desc";
  search?: string;
  status?: "all" | "active" | "inactive";
  createdAtStart?: string;
  createdAtEnd?: string;
  updatedAtStart?: string;
  updatedAtEnd?: string;
};

export type Paginated<T> = {
  page: number;
  limit: number;
  total: number;
  items: T[];
};

export type DefaultResponse<T> = {
  statusCode: number;
  message: string;
  data: T;
};

export type Params = Record<string, string | string[] | number | number[]>;

export type CustomAxiosError = AxiosError<DefaultResponse<null>>;

export type UserInfoDTO = {
  firstName: string;
  lastName: string;
  email: string;
  active: boolean;
  profile: {
    name: string;
    roles: string[];
  };
};
