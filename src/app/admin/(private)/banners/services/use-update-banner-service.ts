import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Banner, UpdateBannerRequest } from "../types/banner";

export function useUpdateBannerService() {
  const router = useRouter();

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
      toast.success("Banner atualizado com sucesso");
    },
  });

  return {
    updateBanner,
    ...data,
  };
}
