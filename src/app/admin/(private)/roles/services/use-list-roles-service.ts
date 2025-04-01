import { useCustomQuery } from "@/services/hooks/use-custom-query";
import { Role } from "../types/roles";

export function useListRolesService() {
  const {
    data: res,
    isPending,
    isLoading,
    isFetching,
    ...data
  } = useCustomQuery<void, void, Role[]>({
    routeName: "listRoles",
    queryKey: ["listRoles"],
  });

  const roles = res ? res.data : [];
  const isEmpty = res ? res.data.length === 0 : true;

  return {
    roles,
    isEmpty,
    isPending: isPending || isLoading || isFetching,
    ...data,
  };
}
