import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function useDeleteUserService() {
  const router = useRouter();

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
      toast.success("Usuário excluído com sucesso");
    },
  });

  return {
    deleteUser,
    ...data,
  };
}
