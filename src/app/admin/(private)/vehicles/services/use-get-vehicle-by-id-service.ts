import { useCustomQuery } from "@/services/hooks/use-custom-query";
import { useRouter } from "next/navigation";
import { Vehicle } from "../types/vehicle";
import { useToaster } from "@/hooks/use-toaster";

export function useGetVehicleByIdService(vehicleId: string) {
  const router = useRouter();
  const toaster = useToaster();

  const {
    data: res,
    isPending,
    isLoading,
    isFetching,
    ...data
  } = useCustomQuery<{ vehicleId: string }, void, Vehicle>({
    routeName: "getVehicleById",
    queryKey: ["getVehicleById", vehicleId],
    params: { vehicleId },
    notHandleError: true,
    onError: () => {
      toaster.error("Erro ao buscar veículo");
      router.replace("/admin/vehicles");
    },
  });

  return {
    vehicle: res?.data,
    isPending: isPending || isLoading || isFetching,
    ...data,
  };
}
