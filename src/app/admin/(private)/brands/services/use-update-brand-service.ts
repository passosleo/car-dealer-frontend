import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { useRouter } from "next/navigation";
import { Brand, UpdateBrandRequest } from "../types/brand";
import { useToaster } from "@/hooks/use-toaster";

export function useUpdateBrandService() {
  const router = useRouter();
  const toaster = useToaster();

  const { mutate: updateBrand, ...data } = useCustomMutate<
    { brandId: string },
    void,
    UpdateBrandRequest,
    Brand
  >({
    routeName: "updateBrand",
    setQueryKeys: ["updateBrand"],
    invalidateQueryKeys: ["listBrands", "getBrandById"],
    onSuccess: () => {
      router.replace("/admin/brands");
      toaster.success("Marca atualizada com sucesso");
    },
  });

  return {
    updateBrand,
    ...data,
  };
}
