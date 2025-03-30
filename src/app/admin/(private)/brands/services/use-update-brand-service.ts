import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Brand, UpdateBrandRequest } from "../types/brand";

export function useUpdateBrandService() {
  const router = useRouter();

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
      toast.success("Marca atualizada com sucesso");
    },
  });

  return {
    updateBrand,
    ...data,
  };
}
