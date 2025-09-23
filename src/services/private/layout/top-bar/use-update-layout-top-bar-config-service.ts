import { useToaster } from "@/hooks/use-toaster";
import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import {
  LayoutTopBarConfig,
  UpdateLayoutTopBarConfig,
} from "@/types/layout-component";

export function useUpdateLayoutTopBarConfigService() {
  const toaster = useToaster();

  const { mutate: updateTopBarConfig, ...data } = useCustomMutate<
    { layoutTopBarConfigId: string },
    void,
    UpdateLayoutTopBarConfig,
    LayoutTopBarConfig
  >({
    routeName: "updateLayoutTopBarConfig",
    setQueryKeys: ["updateLayoutTopBarConfig"],
    invalidateQueryKeys: ["getLayoutTopBarConfig"],
    onSuccess: () => {
      toaster.success("Configuração armazenada com sucesso");
    },
  });

  return {
    updateTopBarConfig,
    ...data,
  };
}
