import type { AxiosError } from "axios";
import { routes } from "./router";

export type RouteName = keyof typeof routes;

export type DefaultResponse<T> = {
  status: number;
  message: string;
  data: T;
};

export type Params = Record<string, string | string[] | number | number[]>;

export type CustomAxiosError = AxiosError<DefaultResponse<null>>;

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

export type CreateSessionDTO = {
  email: string;
  password: string;
};

export type SessionDTO = {
  type: string;
  accessToken: string;
  accessTokenExpiresIn: number;
  refreshToken: string;
  refreshTokenExpiresIn: number;
};

export type RecoverPasswordDTO = {
  password: string;
  token: string;
};

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
