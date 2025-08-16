import { useCustomQuery } from "@/services/hooks/use-custom-query";
import { Paginated } from "@/services/types";
import { useSearchParams } from "@/hooks/use-search-params";
import { Vehicle } from "@/app/admin/(private)/vehicles/types/vehicle";
import { ListActiveVehicleFilters } from "../(types)/vehicle";

export function useListActiveVehiclesService(
  appliedFilters?: Partial<ListActiveVehicleFilters>
) {
  const searchParams = useSearchParams();

  const {
    data: res,
    isPending,
    isLoading,
    isFetching,
    ...data
  } = useCustomQuery<
    void,
    Partial<ListActiveVehicleFilters>,
    Paginated<Vehicle>
  >({
    routeName: "listActiveVehicles",
    queryKey: ["listActiveVehicles", appliedFilters],
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

  const vehicles = res ? res.data.items : [];
  const totalPages = res ? res.data.totalPages : 0;
  const isEmpty = res ? res.data.items.length === 0 : true;

  return {
    vehicles,
    totalPages,
    isEmpty,
    isPending: isPending || isLoading || isFetching,
    ...data,
  };
}
