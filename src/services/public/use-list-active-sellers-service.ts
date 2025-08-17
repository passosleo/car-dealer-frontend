import { useCustomQuery } from "@/services/hooks/use-custom-query";
import { useSearchParams } from "@/hooks/use-search-params";
import { DefaultFilters, Paginated } from "@/types/generic";
import { Seller } from "@/types/seller";

export function useListActiveSellersService(
  appliedFilters?: Partial<DefaultFilters>
) {
  const searchParams = useSearchParams();

  const {
    data: res,
    isPending,
    isLoading,
    isFetching,
    ...data
  } = useCustomQuery<void, Partial<DefaultFilters>, Paginated<Seller>>({
    routeName: "listActiveSellers",
    queryKey: ["listActiveSellers", appliedFilters],
    query: appliedFilters,
    onSuccess: (res) => {
      if (
        appliedFilters &&
        appliedFilters.page &&
        appliedFilters.page > 1 &&
        res.data.items.length === 0
      ) {
        searchParams.removeSearchParam("page");
      }
    },
  });

  const sellers = res ? res.data.items : [];
  const totalPages = res ? res.data.totalPages : 0;
  const isEmpty = res ? res.data.items.length === 0 : true;

  return {
    sellers,
    totalPages,
    isEmpty,
    isPending: isPending || isLoading || isFetching,
    ...data,
  };
}
