import { useCustomQuery } from "@/services/hooks/use-custom-query";
import { GroupedLayoutComponents } from "@/types/layout-component";

type ListLayoutComponentsService = {
  onSuccess?: (data: GroupedLayoutComponents) => void;
};

export function useListGroupedLayoutComponentsService({
  onSuccess,
}: ListLayoutComponentsService = {}) {
  const {
    data: res,
    isPending,
    isLoading,
    isFetching,
    ...data
  } = useCustomQuery<void, void, GroupedLayoutComponents>({
    routeName: "listGroupedLayoutComponents",
    queryKey: ["listGroupedLayoutComponents"],
    onSuccess: (res) => {
      if (onSuccess) {
        onSuccess(res.data);
      }
    },
  });

  return {
    groupedLayoutComponents: res ? res.data : null,
    isEmpty: res ? Object.keys(res.data).length === 0 : true,
    isPending: isPending || isLoading || isFetching,
    ...data,
  };
}
