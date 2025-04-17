import { useToaster } from "@/hooks/use-toaster";
import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { useRouter } from "next/navigation";

export function useDeleteBrandService() {
  const router = useRouter();
  const toaster = useToaster();

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
      toaster.success("Marca excluída com sucesso");
    },
  });

  return {
    deleteBrand,
    ...data,
  };
}
