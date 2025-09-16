import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { useToaster } from "@/hooks/use-toaster";
import {
  LayoutComponent,
  LayoutComponentScope,
  UpdateLayoutComponentPositionsRequest,
} from "@/types/layout-component";

export function useUpdateLayoutComponentPositionsService() {
  const toaster = useToaster();

  const { mutate: updateLayoutComponentPositions, ...data } = useCustomMutate<
    { scope: LayoutComponentScope },
    void,
    UpdateLayoutComponentPositionsRequest,
    LayoutComponent[]
  >({
    routeName: "updateLayoutComponentPositions",
    setQueryKeys: ["updateLayoutComponentPositions"],
    onSuccess: () => {
      toaster.success("Posições salvas com sucesso");
    },
  });

  return {
    updateLayoutComponentPositions,
    ...data,
  };
}
