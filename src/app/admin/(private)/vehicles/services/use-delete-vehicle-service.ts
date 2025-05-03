import { useToaster } from "@/hooks/use-toaster";
import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { useRouter } from "next/navigation";

export function useDeleteVehicleService() {
  const router = useRouter();
  const toaster = useToaster();

  const { mutate: deleteVehicle, ...data } = useCustomMutate<
    { vehicleId: string },
    void,
    void,
    void
  >({
    routeName: "deleteVehicle",
    setQueryKeys: ["deleteVehicle"],
    invalidateQueryKeys: ["listVehicles"],
    onSuccess: () => {
      router.replace("/admin/vehicles");
      toaster.success("Veículo excluído com sucesso");
    },
  });

  return {
    deleteVehicle,
    ...data,
  };
}
