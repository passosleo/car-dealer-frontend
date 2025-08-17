import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { useRouter } from "next/navigation";
import { CreateSellerRequest, Seller } from "@/types/seller";
import { useToaster } from "@/hooks/use-toaster";

export function useCreateSellerService() {
  const router = useRouter();
  const toaster = useToaster();

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
      toaster.success("Vendedor criado com sucesso");
    },
  });

  return {
    createSeller,
    ...data,
  };
}
