import { useCustomQuery } from "@/services/hooks/use-custom-query";
import { DefaultFilters, DefaultResponse, Paginated } from "@/services/types";
import { useSearchParams } from "@/hooks/use-search-params";
import { Profile } from "../types/profile";

export function useListProfilesService(
  appliedFilters: Partial<DefaultFilters>,
  callbacks?: {
    onSuccess?: (res: DefaultResponse<Paginated<Profile>>) => void;
  }
) {
  const searchParams = useSearchParams();

  const {
    data: res,
    isPending,
    isLoading,
    isFetching,
    ...data
  } = useCustomQuery<void, Partial<DefaultFilters>, Paginated<Profile>>({
    routeName: "listProfiles",
    queryKey: ["listProfiles", appliedFilters],
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

  const profiles = res ? res.data.items : [];
  const totalPages = res ? res.data.totalPages : 0;
  const isEmpty = res ? res.data.items.length === 0 : true;

  return {
    profiles,
    totalPages,
    isEmpty,
    isPending: isPending || isLoading || isFetching,
    ...data,
  };
}
