import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function useDeleteProfileService() {
  const router = useRouter();

  const { mutate: deleteProfile, ...data } = useCustomMutate<
    { profileId: string },
    void,
    void,
    void
  >({
    routeName: "deleteProfile",
    setQueryKeys: ["deleteProfile"],
    invalidateQueryKeys: ["listProfiles"],
    notHandleError: true,
    retry: false,
    onSuccess: () => {
      router.replace("/admin/profiles");
      toast.success("Perfil de acesso excluído com sucesso");
    },
    onError: (error: AxiosError) => {
      if (error.status === 409) {
        toast.error(
          "Este perfil de acesso não pode ser excluído, pois está vinculado a um usuário"
        );
      } else {
        toast.error("Algo deu errado, tente novamente mais tarde");
      }
    },
  });

  return {
    deleteProfile,
    ...data,
  };
}
