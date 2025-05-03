import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { useRouter } from "next/navigation";
import { Vehicle, UpdateVehicleRequest } from "../types/vehicle";
import { useToaster } from "@/hooks/use-toaster";

export function useUpdateVehicleService() {
  const router = useRouter();
  const toaster = useToaster();

  const { mutate: updateVehicle, ...data } = useCustomMutate<
    { vehicleId: string },
    void,
    UpdateVehicleRequest,
    Vehicle
  >({
    routeName: "updateVehicle",
    setQueryKeys: ["updateVehicle"],
    invalidateQueryKeys: ["listVehicles", "getVehicleById"],
    onSuccess: () => {
      router.replace("/admin/vehicles");
      toaster.success("Veículo atualizado com sucesso");
    },
  });

  return {
    updateVehicle,
    ...data,
  };
}
