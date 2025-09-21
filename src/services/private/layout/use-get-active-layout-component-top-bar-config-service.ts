import { useCustomQuery } from "@/services/hooks/use-custom-query";
import { LayoutComponentTopBarConfig } from "@/types/layout-component";

export function useGetActiveLayoutComponentTopBarConfigService() {
  const {
    data: res,
    isPending,
    isLoading,
    isFetching,
    ...data
  } = useCustomQuery<void, void, LayoutComponentTopBarConfig>({
    routeName: "getActiveLayoutComponentTopBarConfig",
    queryKey: ["getActiveLayoutComponentTopBarConfig"],
  });

  return {
    topBarConfig: res ? res.data : null,
    isPending: isPending || isLoading || isFetching,
    ...data,
  };
}
