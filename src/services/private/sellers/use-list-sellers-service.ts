import { useCustomQuery } from "@/services/hooks/use-custom-query";
import { useSearchParams } from "@/hooks/use-search-params";
import { DefaultPrivateFilters, Paginated } from "@/types/generic";
import { Seller } from "@/types/seller";

export function useListSellersService(
  appliedFilters: Partial<DefaultPrivateFilters>
) {
  const searchParams = useSearchParams();

  const {
    data: res,
    isPending,
    isLoading,
    isFetching,
    ...data
  } = useCustomQuery<void, Partial<DefaultPrivateFilters>, Paginated<Seller>>({
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
