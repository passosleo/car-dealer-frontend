import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { useRouter } from "next/navigation";
import { CreateProfileRequest, Profile } from "../types/profile";
import { useToaster } from "@/hooks/use-toaster";

export function useCreateProfileService() {
  const router = useRouter();
  const toaster = useToaster();

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
      toaster.success("Perfil de acesso criado com sucesso");
    },
    onError: (error) => {
      if (error.status === 409) {
        toaster.warning("Já existe um perfil de acesso com esse nome");
      } else {
        toaster.error("Algo deu errado, tente novamente mais tarde");
      }
    },
  });

  return {
    createProfile,
    ...data,
  };
}
