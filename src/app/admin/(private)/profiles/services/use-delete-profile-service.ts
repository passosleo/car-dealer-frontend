import { useToaster } from "@/hooks/use-toaster";
import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { useRouter } from "next/navigation";

export function useDeleteProfileService() {
  const router = useRouter();
  const toaster = useToaster();

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
      toaster.success("Perfil de acesso excluído com sucesso");
    },
    onError: (error) => {
      if (error.status === 409) {
        toaster.warning(
          "Este perfil de acesso não pode ser excluído, pois está vinculado a um usuário"
        );
      } else {
        toaster.error("Algo deu errado, tente novamente mais tarde");
      }
    },
  });

  return {
    deleteProfile,
    ...data,
  };
}
