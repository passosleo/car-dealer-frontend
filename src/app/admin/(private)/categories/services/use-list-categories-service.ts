import { useCustomQuery } from "@/services/hooks/use-custom-query";
import { DefaultFilters, DefaultResponse, Paginated } from "@/services/types";
import { useSearchParams } from "@/hooks/use-search-params";
import { Category } from "../types/category";

export function useListCategoriesService(
  appliedFilters: Partial<DefaultFilters>,
  callbacks?: {
    onSuccess?: (res: DefaultResponse<Paginated<Category>>) => void;
  }
) {
  const searchParams = useSearchParams();

  const {
    data: res,
    isPending,
    isLoading,
    isFetching,
    ...data
  } = useCustomQuery<void, Partial<DefaultFilters>, Paginated<Category>>({
    routeName: "listCategories",
    queryKey: ["listCategories", appliedFilters],
    query: appliedFilters,
    onSuccess: (res) => {
      if (
        appliedFilters.page &&
        appliedFilters.page > 1 &&
        res.data.items.length === 0
      ) {
        searchParams.removeSearchParam("page");
      }
      if (callbacks && callbacks.onSuccess) {
        callbacks.onSuccess(res);
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
