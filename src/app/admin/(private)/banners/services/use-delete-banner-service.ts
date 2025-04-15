import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function useDeleteBannerService() {
  const router = useRouter();

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
      toast.success("Banner excluído com sucesso");
    },
  });

  return {
    deleteBanner,
    ...data,
  };
}
