import { useCustomQuery } from "@/services/hooks/use-custom-query";
import { DefaultFilters, Paginated } from "@/services/types";
import { useSearchParams } from "@/hooks/use-search-params";
import { Banner } from "../types/banner";

export function useListBannersService(
  appliedFilters: Partial<
    DefaultFilters & {
      visible: "all" | "visible" | "hidden";
    }
  >
) {
  const searchParams = useSearchParams();

  const {
    data: res,
    isPending,
    isLoading,
    isFetching,
    ...data
  } = useCustomQuery<void, Partial<DefaultFilters>, Paginated<Banner>>({
    routeName: "listBanners",
    queryKey: ["listBanners", appliedFilters],
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

  const banners = res ? res.data.items : [];
  const totalPages = res ? res.data.totalPages : 0;
  const isEmpty = res ? res.data.items.length === 0 : true;

  return {
    banners,
    totalPages,
    isEmpty,
    isPending: isPending || isLoading || isFetching,
    ...data,
  };
}
