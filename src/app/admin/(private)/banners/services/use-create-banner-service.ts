import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { useRouter } from "next/navigation";
import { Banner, CreateBannerRequest } from "../types/banner";
import { useToaster } from "@/hooks/use-toaster";

export function useCreateBannerService() {
  const router = useRouter();
  const toaster = useToaster();

  const { mutate: createBanner, ...data } = useCustomMutate<
    void,
    void,
    CreateBannerRequest,
    Banner
  >({
    routeName: "createBanner",
    setQueryKeys: ["createBanner"],
    invalidateQueryKeys: ["listBanners"],
    onSuccess: () => {
      router.replace("/admin/banners");
      toaster.success("Banner criado com sucesso");
    },
  });

  return {
    createBanner,
    ...data,
  };
}
