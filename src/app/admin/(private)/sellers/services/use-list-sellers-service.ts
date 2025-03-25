import { useCustomQuery } from "@/services/hooks/use-custom-query";
import { DefaultFilters, Paginated } from "@/services/types";
import { Seller } from "../types/seller";
import { useSearchParams } from "@/hooks/use-search-params";

export function useListSellersService(appliedFilters: Partial<DefaultFilters>) {
  const searchParams = useSearchParams();

  const {
    data: res,
    isPending,
    isLoading,
    isFetching,
    ...data
  } = useCustomQuery<void, Partial<DefaultFilters>, Paginated<Seller>>({
    routeName: "listSellers",
    queryKey: ["listSellers", appliedFilters],
    query: appliedFilters,
    onSuccess: (res) => {
      if (
        appliedFilters.page &&
        appliedFilters.page > 1 &&
        res.data.items.length === 0
      ) {
        searchParams.removeSearchParam("page");
      }
    },
  });

  const sellers = res ? res.data.items : [];
  const total = res ? res.data.total : 0;
  const isEmpty = res ? res.data.items.length === 0 : true;

  return {
    sellers,
    total,
    isEmpty,
    isPending: isPending || isLoading || isFetching,
    ...data,
  };
}
