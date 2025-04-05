import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { UpdateUserRequest, User } from "../types/user";

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
    onSuccess: () => {
      router.replace("/admin/users");
      toast.success("Usuário atualizado com sucesso");
    },
  });

  return {
    updateUser,
    ...data,
  };
}
