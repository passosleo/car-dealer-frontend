import { useCustomQuery } from "@/services/hooks/use-custom-query";
import { useSearchParams } from "@/hooks/use-search-params";
import { DefaultPrivateFilters, Paginated } from "@/types/generic";
import { Banner } from "@/types/banner";

export function useListBannersService(
  appliedFilters: Partial<
    DefaultPrivateFilters & {
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
  } = useCustomQuery<void, Partial<DefaultPrivateFilters>, Paginated<Banner>>({
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
