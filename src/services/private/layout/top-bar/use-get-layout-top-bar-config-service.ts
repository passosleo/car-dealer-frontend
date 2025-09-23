import { useCustomQuery } from "@/services/hooks/use-custom-query";
import { LayoutTopBarConfig } from "@/types/layout-component";

export function useGetLayoutTopBarConfigService() {
  const {
    data: res,
    isPending,
    isLoading,
    isFetching,
    ...data
  } = useCustomQuery<void, void, LayoutTopBarConfig>({
    routeName: "getLayoutTopBarConfig",
    queryKey: ["getLayoutTopBarConfig"],
  });

  return {
    topBarConfig: res ? res.data : null,
    isPending: isPending || isLoading || isFetching,
    ...data,
  };
}
