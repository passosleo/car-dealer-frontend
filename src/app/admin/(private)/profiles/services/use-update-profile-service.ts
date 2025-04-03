import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Profile, UpdateProfileRequest } from "../types/profile";

export function useUpdateProfileService() {
  const router = useRouter();

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
      toast.success("Perfil de acesso atualizado com sucesso");
    },
  });

  return {
    updateProfile,
    ...data,
  };
}
