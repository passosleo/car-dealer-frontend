import { useCustomQuery } from "@/services/hooks/use-custom-query";
import { DefaultFilters, Paginated } from "@/services/types";
import { Seller } from "../types/seller";

export function useListSellersService(appliedFilters: Partial<DefaultFilters>) {
  const { data: res, ...service } = useCustomQuery<
    void,
    Partial<DefaultFilters>,
    Paginated<Seller>
  >({
    routeName: "listSellers",
    queryKey: ["listSellers", appliedFilters],
    query: appliedFilters,
  });
  return {
    sellers: res ? res.data.items : [],
    total: res ? res.data.total : 0,
    ...service,
  };
}
