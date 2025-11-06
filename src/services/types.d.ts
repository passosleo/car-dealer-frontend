import { DefaultResponse } from "@/types/generic";
import type { AxiosError } from "axios";
import { routes } from "./router";

export type RouteName = keyof typeof routes;

export type Params = Record<string, string | string[] | number | number[]>;

export type CustomAxiosError = AxiosError<DefaultResponse<null>>;
