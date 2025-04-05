import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useCustomQuery } from "@/services/hooks/use-custom-query";
import { User } from "../types/user";

export function useGetUserByIdService(userId: string) {
  const router = useRouter();

  const {
    data: res,
    isPending,
    isLoading,
    isFetching,
    ...data
  } = useCustomQuery<{ userId: string }, void, User>({
    routeName: "getUserById",
    queryKey: ["getUserById", userId],
    params: { userId },
    notHandleError: true,
    onError: () => {
      toast.error("Erro ao buscar usuário");
      router.replace("/admin/users");
    },
  });

  return {
    user: res?.data,
    isPending: isPending || isLoading || isFetching,
    ...data,
  };
}
