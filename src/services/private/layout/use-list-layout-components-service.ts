import { useCustomQuery } from "@/services/hooks/use-custom-query";
import { LayoutComponent } from "@/types/layout-component";

type ListLayoutComponentsService = {
  onSuccess?: (data: LayoutComponent[]) => void;
};

export function useListLayoutComponentsService({
  onSuccess,
}: ListLayoutComponentsService = {}) {
  const {
    data: res,
    isPending,
    isLoading,
    isFetching,
    ...data
  } = useCustomQuery<void, void, LayoutComponent[]>({
    routeName: "listLayoutComponents",
    queryKey: ["listLayoutComponents"],
    onSuccess: (res) => {
      if (onSuccess) {
        onSuccess(res.data);
      }
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
