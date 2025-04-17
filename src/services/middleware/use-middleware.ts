import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { Params, RouteName } from "../types";
import { HOST, routes } from "../router";
import { mountUrl } from "@/utils/url";
import { useSession } from "@/hooks/use-session";
import { isTokenValid } from "@/utils/jwt";
import { useToaster } from "@/hooks/use-toaster";

export type RequestAxiosProps<
  PayloadType = unknown,
  ParamsType = Params,
  QueryType = Params
> = {
  config?: AxiosRequestConfig;
  routeName: RouteName;
  payload?: PayloadType;
  withAuth?: boolean;
  params?: ParamsType;
  query?: QueryType;
};

export function useMiddleware() {
  const session = useSession();
  const toaster = useToaster();

  async function setAxiosAuthorization(instance: AxiosInstance) {
    const { accessToken, refreshToken } = session.getTokens();

    if (accessToken && isTokenValid(accessToken)) {
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
      return instance;
    }

    if (refreshToken && isTokenValid(refreshToken)) {
      const data = await session.refresh();
      if (data) {
        instance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.accessToken}`;

        return instance;
      }
    }

    session.expire();
    return instance;
  }

  async function requestAxios<
    PayloadType = unknown,
    ParamsType = Params,
    QueryType = Params,
    ResponseType = unknown
  >({
    config = {},
    routeName,
    payload,
    params,
    query,
  }: RequestAxiosProps<PayloadType, ParamsType, QueryType>) {
    const { method, uri, headers } = routes[routeName] as {
      headers?: string[];
      method: string;
      uri: string;
    };

    const request = Axios.create({
      ...config,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...((config?.headers ?? {}) as Record<string, string>),
      },
    });
    const urlWithParams = mountUrl(uri, HOST, params, query);

    if (!!headers && headers.includes("Authorization"))
      await setAxiosAuthorization(request);

    switch (method) {
      case "GET":
        return request.get<ResponseType>(urlWithParams);
      case "POST":
        return request.post<ResponseType>(urlWithParams, payload);
      case "PUT":
        return request.put<ResponseType>(urlWithParams, payload);
      case "PATCH":
        return request.patch<ResponseType>(urlWithParams, payload);
      case "DELETE":
        return request.delete<ResponseType>(urlWithParams);
      default:
        return request.get<ResponseType>(urlWithParams);
    }
  }

  function handleAxiosError(error: AxiosError) {
    const messageError = "Algo deu errado, tente novamente mais tarde";

    toaster.error(messageError);

    if (error.response?.status === 401) {
      session.expire();
    }

    return { messageError };
  }

  return { requestAxios, handleAxiosError, setAxiosAuthorization };
}
