import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { CreateUserRequest, User } from "../types/user";
import { useCustomMutate } from "@/services/hooks/use-custom-mutate";

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
    onSuccess: () => {
      router.replace("/admin/users");
      toast.success("Usuário criado com sucesso");
    },
  });

  return {
    createUser,
    ...data,
  };
}
