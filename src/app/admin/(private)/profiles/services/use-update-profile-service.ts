import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { useRouter } from "next/navigation";
import { Profile, UpdateProfileRequest } from "../types/profile";
import { useToaster } from "@/hooks/use-toaster";

export function useUpdateProfileService() {
  const router = useRouter();
  const toaster = useToaster();

  const { mutate: updateProfile, ...data } = useCustomMutate<
    { profileId: string },
    void,
    UpdateProfileRequest,
    Profile
  >({
    routeName: "updateProfile",
    setQueryKeys: ["updateProfile"],
    invalidateQueryKeys: ["listProfiles", "getProfileById"],
    onSuccess: () => {
      router.replace("/admin/profiles");
      toaster.success("Perfil de acesso atualizado com sucesso");
    },
  });

  return {
    updateProfile,
    ...data,
  };
}
