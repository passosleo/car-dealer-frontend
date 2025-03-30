import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function useDeleteBrandService() {
  const router = useRouter();

  const { mutate: deleteBrand, ...data } = useCustomMutate<
    { brandId: string },
    void,
    void,
    void
  >({
    routeName: "deleteBrand",
    setQueryKeys: ["deleteBrand"],
    invalidateQueryKeys: ["listBrands"],
    onSuccess: () => {
      router.replace("/admin/brands");
      toast.success("Marca excluída com sucesso");
    },
  });

  return {
    deleteBrand,
    ...data,
  };
}
