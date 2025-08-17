import { useToaster } from "@/hooks/use-toaster";
import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { useRouter } from "next/navigation";

export function useDeleteBannerService() {
  const router = useRouter();
  const toaster = useToaster();

  const { mutate: deleteBanner, ...data } = useCustomMutate<
    { bannerId: string },
    void,
    void,
    void
  >({
    routeName: "deleteBanner",
    setQueryKeys: ["deleteBanner"],
    invalidateQueryKeys: ["listBanners"],
    onSuccess: () => {
      router.replace("/admin/banners");
      toaster.success("Banner excluído com sucesso");
    },
  });

  return {
    deleteBanner,
    ...data,
  };
}
