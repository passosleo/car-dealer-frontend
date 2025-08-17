import { useCustomQuery } from "@/services/hooks/use-custom-query";
import { useSearchParams } from "@/hooks/use-search-params";
import { DefaultFilters, Paginated } from "@/types/generic";
import { Brand } from "@/types/brand";

export function useListActiveBrandsService(
  appliedFilters?: Partial<DefaultFilters>
) {
  const searchParams = useSearchParams();

  const {
    data: res,
    isPending,
    isLoading,
    isFetching,
    ...data
  } = useCustomQuery<void, Partial<DefaultFilters>, Paginated<Brand>>({
    routeName: "listActiveBrands",
    queryKey: ["listActiveBrands", appliedFilters],
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

  const brands = res ? res.data.items : [];
  const totalPages = res ? res.data.totalPages : 0;
  const isEmpty = res ? res.data.items.length === 0 : true;

  return {
    brands,
    totalPages,
    isEmpty,
    isPending: isPending || isLoading || isFetching,
    ...data,
  };
}
