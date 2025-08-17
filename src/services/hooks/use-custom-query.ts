import { QueryKey, UseQueryOptions, useQuery } from "@tanstack/react-query";
import { useMiddleware } from "../middleware/use-middleware";
import { Params, RouteName } from "../types";
import { AxiosError } from "axios";
import { DefaultResponse } from "@/types/generic";

export type CustomQueryProps<
  ParamsType = Params,
  QueryType = Params,
  ResponseType = unknown
> = {
  onError?: (error: AxiosError, res?: DefaultResponse<ResponseType>) => void;
  onSuccess?: (data: DefaultResponse<ResponseType>) => void;
  queryOptions?: UseQueryOptions<DefaultResponse<ResponseType>>;
  notHandleError?: boolean;
  queryKey: QueryKey;
  routeName: RouteName;
  enabled?: boolean;
  params?: ParamsType;
  query?: QueryType;
};

export function useCustomQuery<ParamsType, QueryType, ResponseType>({
  queryKey,
  enabled = true,
  notHandleError,
  queryOptions,
  routeName,
  params,
  query: queryParam,
  ...statusFunctions
}: CustomQueryProps<ParamsType, QueryType, ResponseType>) {
  const { requestAxios, handleAxiosError } = useMiddleware();

  function onError(error: AxiosError<any>) {
    if (!notHandleError) handleAxiosError(error);
    if (statusFunctions.onError)
      statusFunctions.onError(error, error.response?.data);
    return null;
  }

  function onSuccess(data: DefaultResponse<ResponseType>) {
    if (statusFunctions.onSuccess) statusFunctions.onSuccess(data);
  }

  async function handleQuery() {
    return requestAxios<void, ParamsType, QueryType, ResponseType>({
      routeName,
      params,
      query: queryParam,
    })
      .then((res) => {
        onSuccess(res.data as DefaultResponse<ResponseType>);
        return res.data;
      })
      .catch(onError) as Promise<DefaultResponse<ResponseType>>;
  }

  return useQuery({
    queryKey,
    enabled,
    queryFn: handleQuery,
    ...queryOptions,
  });
}
