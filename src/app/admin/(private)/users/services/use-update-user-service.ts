import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { UpdateUserRequest, User } from "../types/user";
import { AxiosError } from "axios";

export function useUpdateUserService() {
  const router = useRouter();

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
      toast.success("Usuário atualizado com sucesso");
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
    updateUser,
    ...data,
  };
}
