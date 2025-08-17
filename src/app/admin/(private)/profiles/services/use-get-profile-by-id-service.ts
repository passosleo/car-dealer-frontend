import { useCustomQuery } from "@/services/hooks/use-custom-query";
import { useRouter } from "next/navigation";
import { Profile } from "@/types/profile";
import { useToaster } from "@/hooks/use-toaster";

export function useGetProfileByIdService(profileId: string) {
  const router = useRouter();
  const toaster = useToaster();

  const {
    data: res,
    isPending,
    isLoading,
    isFetching,
    ...data
  } = useCustomQuery<{ profileId: string }, void, Profile>({
    routeName: "getProfileById",
    queryKey: ["getProfileById", profileId],
    params: { profileId },
    notHandleError: true,
    onError: () => {
      toaster.error("Erro ao buscar perfil de acesso");
      router.replace("/admin/profiles");
    },
  });

  return {
    profile: res?.data,
    isPending: isPending || isLoading || isFetching,
    ...data,
  };
}
