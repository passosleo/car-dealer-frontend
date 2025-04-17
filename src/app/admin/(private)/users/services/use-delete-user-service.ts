import { useToaster } from "@/hooks/use-toaster";
import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { useRouter } from "next/navigation";

export function useDeleteUserService() {
  const router = useRouter();
  const toaster = useToaster();

  const { mutate: deleteUser, ...data } = useCustomMutate<
    { userId: string },
    void,
    void,
    void
  >({
    routeName: "deleteUser",
    setQueryKeys: ["deleteUser"],
    invalidateQueryKeys: ["listUsers"],
    onSuccess: () => {
      router.replace("/admin/users");
      toaster.success("Usuário excluído com sucesso");
    },
  });

  return {
    deleteUser,
    ...data,
  };
}
