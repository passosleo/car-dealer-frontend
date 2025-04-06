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

  const filteredQuery = query
    ? Object.fromEntries(
        Object.entries(query).filter(([, value]) => value !== "")
      )
    : {};

  const queryString =
    Object.keys(filteredQuery).length > 0 ? "?" + stringify(filteredQuery) : "";

  const completedUrl = urlApi + urlWithParams + queryString;

  return completedUrl;
}
