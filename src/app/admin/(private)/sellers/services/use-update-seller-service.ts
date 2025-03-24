import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { Seller, UpdateSellerRequest } from "../types/seller";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function useUpdateSellerService() {
  const router = useRouter();

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
      router.back();
      toast.success("Vendedor atualizado com sucesso");
    },
  });

  return {
    updateSeller,
    ...data,
  };
}
