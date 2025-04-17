import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { useRouter } from "next/navigation";
import { Banner, UpdateBannerRequest } from "../types/banner";
import { useToaster } from "@/hooks/use-toaster";

export function useUpdateBannerService() {
  const router = useRouter();
  const toaster = useToaster();

  const { mutate: updateBanner, ...data } = useCustomMutate<
    { bannerId: string },
    void,
    UpdateBannerRequest,
    Banner
  >({
    routeName: "updateBanner",
    setQueryKeys: ["updateBanner"],
    invalidateQueryKeys: ["listBanners", "getBannerById"],
    onSuccess: () => {
      router.replace("/admin/banners");
      toaster.success("Banner atualizado com sucesso");
    },
  });

  return {
    updateBanner,
    ...data,
  };
}
