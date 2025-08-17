import { useRouter } from "next/navigation";
import { useCustomQuery } from "@/services/hooks/use-custom-query";
import { User } from "@/types/user";
import { useToaster } from "@/hooks/use-toaster";

export function useGetUserByIdService(userId: string) {
  const router = useRouter();
  const toaster = useToaster();

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
      toaster.error("Erro ao buscar usuário");
      router.replace("/admin/users");
    },
  });

  return {
    user: res?.data,
    isPending: isPending || isLoading || isFetching,
    ...data,
  };
}
