import { useCustomQuery } from "@/services/hooks/use-custom-query";
import { useRouter } from "next/navigation";
import { useToaster } from "@/hooks/use-toaster";
import {
  LayoutComponent,
  LayoutComponentScope,
} from "@/types/layout-component";

type ListLayoutComponentsByScopeService = {
  onSuccess?: (data: LayoutComponent[]) => void;
};

export function useListLayoutComponentsByScopeService(
  scope: LayoutComponentScope,
  { onSuccess }: ListLayoutComponentsByScopeService = {}
) {
  const router = useRouter();
  const toaster = useToaster();

  const {
    data: res,
    isPending,
    isLoading,
    isFetching,
    ...data
  } = useCustomQuery<{ scope: string }, void, LayoutComponent[]>({
    routeName: "listLayoutComponentsByScope",
    queryKey: ["listLayoutComponentsByScope", scope],
    params: { scope },
    notHandleError: true,
    onSuccess: (res) => {
      if (onSuccess) {
        onSuccess(res.data);
      }
    },
    onError: () => {
      toaster.error("Erro ao buscar componentes de layout.");
      router.replace("/admin/layout");
    },
  });

  const layoutComponents = res ? res.data : [];
  const isEmpty = res ? res.data.length === 0 : true;

  return {
    layoutComponents,
    isEmpty,
    isPending: isPending || isLoading || isFetching,
    ...data,
  };
}
