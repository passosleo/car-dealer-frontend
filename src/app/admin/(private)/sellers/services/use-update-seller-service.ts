import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { Seller, UpdateSellerRequest } from "../types/seller";
import { useRouter } from "next/navigation";
import { useToaster } from "@/hooks/use-toaster";

export function useUpdateSellerService() {
  const router = useRouter();
  const toaster = useToaster();

  const { mutate: updateSeller, ...data } = useCustomMutate<
    { sellerId: string },
    void,
    UpdateSellerRequest,
    Seller
  >({
    routeName: "updateSeller",
    setQueryKeys: ["updateSeller"],
    invalidateQueryKeys: ["listSellers", "getSellerById"],
    onSuccess: () => {
      router.replace("/admin/sellers");
      toaster.success("Vendedor atualizado com sucesso");
    },
  });

  return {
    updateSeller,
    ...data,
  };
}
