import { useCustomQuery } from "@/services/hooks/use-custom-query";
import { Paginated } from "@/services/types";
import { useSearchParams } from "@/hooks/use-search-params";
import { Brand } from "@/app/admin/(private)/brands/types/brand";
import { ListActiveBrandFilters } from "../(types)/brand";

export function useListActiveBrandsService(
  appliedFilters: Partial<ListActiveBrandFilters>
) {
  const searchParams = useSearchParams();

  const {
    data: res,
    isPending,
    isLoading,
    isFetching,
    ...data
  } = useCustomQuery<void, Partial<ListActiveBrandFilters>, Paginated<Brand>>({
    routeName: "listActiveBrands",
    queryKey: ["listActiveBrands", appliedFilters],
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
