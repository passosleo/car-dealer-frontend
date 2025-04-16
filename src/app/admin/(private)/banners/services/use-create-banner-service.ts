import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Banner, CreateBannerRequest } from "../types/banner";

export function useCreateBannerService() {
  const router = useRouter();

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
      toast.success("Banner criado com sucesso");
    },
  });

  return {
    createBanner,
    ...data,
  };
}
