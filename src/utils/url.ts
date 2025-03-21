import { Params } from "@/services/types";
import { stringify } from "qs";

export function replaceParams(url: string, params: Params) {
  const urlWithParams = Object.entries(params).reduce((acc, [key, value]) => {
    return acc.replaceAll(`:${key}`, value.toString());
  }, url);
  return urlWithParams;
}

export function mountUrl<ParamsType = Params, QueryType = Params>(
  url: string,
  baseUrl: string,
  params?: ParamsType,
  query?: QueryType
) {
  const urlApi = baseUrl;
  const urlWithParams = params ? replaceParams(url, params) : url;
  const queryString =
    query && Object.keys(query).length > 0 ? "?" + stringify(query) : "";

  const completedUrl = urlApi + urlWithParams + queryString;

  return completedUrl;
}
