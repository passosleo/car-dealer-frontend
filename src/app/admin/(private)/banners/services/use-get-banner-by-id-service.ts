import { useCustomQuery } from "@/services/hooks/use-custom-query";
import { useRouter } from "next/navigation";
import { useToaster } from "@/hooks/use-toaster";
import { Banner } from "@/types/banner";

export function useGetBannerByIdService(bannerId: string) {
  const router = useRouter();
  const toaster = useToaster();

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
      toaster.error("Erro ao buscar banner");
      router.replace("/admin/banners");
    },
  });

  return {
    banner: res?.data,
    isPending: isPending || isLoading || isFetching,
    ...data,
  };
}
