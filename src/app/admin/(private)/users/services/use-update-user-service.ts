import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { useRouter } from "next/navigation";
import { useToaster } from "@/hooks/use-toaster";
import { UpdateUserRequest, User } from "@/types/user";

export function useUpdateUserService() {
  const router = useRouter();
  const toaster = useToaster();

  const { mutate: updateUser, ...data } = useCustomMutate<
    { userId: string },
    void,
    UpdateUserRequest,
    User
  >({
    routeName: "updateUser",
    setQueryKeys: ["updateUser"],
    invalidateQueryKeys: ["listUsers", "getUserById"],
    notHandleError: true,
    retry: false,
    onSuccess: () => {
      router.replace("/admin/users");
      toaster.success("Usuário atualizado com sucesso");
    },
    onError: (error) => {
      if (error.status === 409) {
        toaster.warning("Já existe um usuário com esse e-mail");
      } else {
        toaster.error("Algo deu errado, tente novamente mais tarde");
      }
    },
  });

  return {
    updateUser,
    ...data,
  };
}
