import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { useRouter } from "next/navigation";
import { CreateVehicleRequest, Vehicle } from "../types/vehicle";
import { useToaster } from "@/hooks/use-toaster";

export function useCreateVehicleService() {
  const router = useRouter();
  const toaster = useToaster();

  const { mutate: createVehicle, ...data } = useCustomMutate<
    void,
    void,
    CreateVehicleRequest,
    Vehicle
  >({
    routeName: "createVehicle",
    setQueryKeys: ["createVehicle"],
    invalidateQueryKeys: ["listVehicles"],
    notHandleError: true,
    retry: false,
    onSuccess: () => {
      router.replace("/admin/vehicles");
      toaster.success("Veículo adicionado com sucesso");
    },
    onError: (error) => {
      if (error.status === 409) {
        toaster.warning("Já existe um veículo com essa placa");
      } else {
        toaster.error("Algo deu errado, tente novamente mais tarde");
      }
    },
  });

  return {
    createVehicle,
    ...data,
  };
}
