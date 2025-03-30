import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { CreateSellerRequest, Seller } from "../types/seller";

export function useCreateSellerService() {
  const router = useRouter();

  const { mutate: createSeller, ...data } = useCustomMutate<
    void,
    void,
    CreateSellerRequest,
    Seller
  >({
    routeName: "createSeller",
    setQueryKeys: ["createSeller"],
    invalidateQueryKeys: ["listSellers"],
    onSuccess: () => {
      router.replace("/admin/sellers");
      toast.success("Vendedor criado com sucesso");
    },
  });

  return {
    createSeller,
    ...data,
  };
}
