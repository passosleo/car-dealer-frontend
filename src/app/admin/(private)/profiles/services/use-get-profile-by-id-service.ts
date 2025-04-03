import { useCustomQuery } from "@/services/hooks/use-custom-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Profile } from "../types/profile";

export function useGetProfileByIdService(profileId: string) {
  const router = useRouter();

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
      toast.error("Erro ao buscar perfil de acesso");
      router.replace("/admin/profiles");
    },
  });

  return {
    profile: res?.data,
    isPending: isPending || isLoading || isFetching,
    ...data,
  };
}
