import { useCustomQuery } from "@/services/hooks/use-custom-query";
import { LayoutComponent } from "../types/layout-component";

export function useListLayoutComponentsService() {
  const {
    data: res,
    isPending,
    isLoading,
    isFetching,
    ...data
  } = useCustomQuery<void, void, LayoutComponent[]>({
    routeName: "listLayoutComponents",
    queryKey: ["listLayoutComponents"],
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
