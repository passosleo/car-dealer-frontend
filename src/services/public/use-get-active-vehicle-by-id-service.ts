import { useCustomQuery } from "@/services/hooks/use-custom-query";
import { Vehicle } from "@/types/vehicle";

export function useGetActiveVehicleByIdService(vehicleId: string) {
  const {
    data: res,
    isPending,
    isLoading,
    isFetching,
    ...data
  } = useCustomQuery<{ vehicleId: string }, void, Vehicle>({
    routeName: "getActiveVehicleById",
    queryKey: ["getActiveVehicleById", vehicleId],
    params: { vehicleId },
  });

  return {
    vehicle: res?.data,
    isPending: isPending || isLoading || isFetching,
    ...data,
  };
}
