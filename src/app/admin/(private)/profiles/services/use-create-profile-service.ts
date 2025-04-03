import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CreateProfileRequest, Profile } from "../types/profile";

export function useCreateProfileService() {
  const router = useRouter();

  const { mutate: createProfile, ...data } = useCustomMutate<
    void,
    void,
    CreateProfileRequest,
    Profile
  >({
    routeName: "createProfile",
    setQueryKeys: ["createProfile"],
    invalidateQueryKeys: ["listProfiles"],
    notHandleError: true,
    retry: false,
    onSuccess: () => {
      router.replace("/admin/profiles");
      toast.success("Perfil de acesso criado com sucesso");
    },
    onError: (error: AxiosError) => {
      if (error.status === 409) {
        toast.error("Já existe um perfil de acesso com esse nome");
      } else {
        toast.error("Algo deu errado, tente novamente mais tarde");
      }
    },
  });

  return {
    createProfile,
    ...data,
  };
}
