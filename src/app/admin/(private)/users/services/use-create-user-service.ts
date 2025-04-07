import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { CreateUserRequest, User } from "../types/user";
import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { AxiosError } from "axios";

export function useCreateUserService() {
  const router = useRouter();

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
      toast.success("Usuário criado com sucesso");
    },
    onError: (error: AxiosError) => {
      if (error.status === 409) {
        toast.error("Já existe um usuário com esse e-mail");
      } else {
        toast.error("Algo deu errado, tente novamente mais tarde");
      }
    },
  });

  return {
    createUser,
    ...data,
  };
}
