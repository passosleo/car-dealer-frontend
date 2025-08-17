import { useRouter } from "next/navigation";
import { CreateUserRequest, User } from "@/types/user";
import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { useToaster } from "@/hooks/use-toaster";

export function useCreateUserService() {
  const router = useRouter();
  const toaster = useToaster();

  const { mutate: createUser, ...data } = useCustomMutate<
    void,
    void,
    CreateUserRequest,
    User
  >({
    routeName: "createUser",
    setQueryKeys: ["createUser"],
    invalidateQueryKeys: ["listUsers"],
    notHandleError: true,
    retry: false,
    onSuccess: () => {
      router.replace("/admin/users");
      toaster.success("Usuário criado com sucesso");
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
    createUser,
    ...data,
  };
}
