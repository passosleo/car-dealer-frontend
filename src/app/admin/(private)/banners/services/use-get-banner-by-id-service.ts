import { useCustomQuery } from "@/services/hooks/use-custom-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Banner } from "../types/banner";

export function useGetBannerByIdService(bannerId: string) {
  const router = useRouter();

  const {
    data: res,
    isPending,
    isLoading,
    isFetching,
    ...data
  } = useCustomQuery<{ bannerId: string }, void, Banner>({
    routeName: "getBannerById",
    queryKey: ["getBannerById", bannerId],
    params: { bannerId },
    notHandleError: true,
    onError: () => {
      toast.error("Erro ao buscar banner");
      router.replace("/admin/banners");
    },
  });

  return {
    banner: res?.data,
    isPending: isPending || isLoading || isFetching,
    ...data,
  };
}
