import { AxiosError, AxiosRequestConfig } from "axios";
import { useQueryClient, useMutation, QueryKey } from "@tanstack/react-query";
import { useMiddleware } from "../middleware/use-middleware";
import { DefaultResponse, RouteName } from "../types";

export type CustomMutationProps<
  ParamsType,
  QueryType,
  PayloadType,
  ReturnData
> = {
  routeName: RouteName;
  notHandleError?: boolean;
  setQueryKeys?: string[];
  invalidateQueryKeys?: QueryKey;
  axiosConfig?: AxiosRequestConfig<any>;
  retry?: number | false;
  retryDelay?: number;
  onError?: (error: any, res?: DefaultResponse<ReturnData>) => void;
  onSuccess?: (data: DefaultResponse<ReturnData>) => void;
  onMutate?: (variables: {
    payload?: PayloadType;
    params?: ParamsType;
    query?: QueryType;
  }) => void;
};

export function useCustomMutate<
  ParamsType = any,
  QueryType = any,
  PayloadType = any,
  ReturnData = any
>({
  routeName,
  notHandleError,
  setQueryKeys,
  axiosConfig = {},
  invalidateQueryKeys,
  retry = 3,
  retryDelay = 1000,
  ...statusFunctions
}: CustomMutationProps<ParamsType, QueryType, PayloadType, ReturnData>) {
  const queryClient = useQueryClient();
  const { requestAxios, handleAxiosError } = useMiddleware();

  function onError(error: AxiosError<any>) {
    if (!notHandleError) handleAxiosError(error);
    if (statusFunctions.onError)
      statusFunctions.onError(error, error.response?.data);
    return null;
  }

  function onSuccess(data: DefaultResponse<ReturnData>) {
    if (invalidateQueryKeys)
      queryClient.invalidateQueries({ queryKey: invalidateQueryKeys });
    if (setQueryKeys) queryClient.setQueryData(setQueryKeys, data);
    if (statusFunctions.onSuccess) statusFunctions.onSuccess(data);
  }

  async function handleMutate({
    payload,
    params,
    query,
  }: {
    payload?: PayloadType;
    params?: ParamsType;
    query?: QueryType;
  }) {
    return requestAxios({
      config: axiosConfig,
      routeName,
      payload,
      params,
      query,
    }).then((res) => res.data) as Promise<DefaultResponse<ReturnData>>;
  }

  return useMutation({
    mutationFn: handleMutate,
    onMutate: statusFunctions.onMutate,
    retry,
    retryDelay,
    onSuccess,
    onError,
  });
}
