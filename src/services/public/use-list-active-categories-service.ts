import { useCustomQuery } from "@/services/hooks/use-custom-query";
import { useSearchParams } from "@/hooks/use-search-params";
import { DefaultFilters, Paginated } from "@/types/generic";
import { Category } from "@/types/category";

export function useListActiveCategoriesService(
  appliedFilters?: Partial<DefaultFilters>
) {
  const searchParams = useSearchParams();

  const {
    data: res,
    isPending,
    isLoading,
    isFetching,
    ...data
  } = useCustomQuery<void, Partial<DefaultFilters>, Paginated<Category>>({
    routeName: "listActiveCategories",
    queryKey: ["listActiveCategories", appliedFilters],
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

  const categories = res ? res.data.items : [];
  const totalPages = res ? res.data.totalPages : 0;
  const isEmpty = res ? res.data.items.length === 0 : true;

  return {
    categories,
    totalPages,
    isEmpty,
    isPending: isPending || isLoading || isFetching,
    ...data,
  };
}
