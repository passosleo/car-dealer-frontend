import { useToaster } from "@/hooks/use-toaster";
import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { useRouter } from "next/navigation";

export function useDeleteSellerService() {
  const router = useRouter();
  const toaster = useToaster();

  const { mutate: deleteSeller, ...data } = useCustomMutate<
    { sellerId: string },
    void,
    void,
    void
  >({
    routeName: "deleteSeller",
    setQueryKeys: ["deleteSeller"],
    invalidateQueryKeys: ["listSellers"],
    onSuccess: () => {
      router.replace("/admin/sellers");
      toaster.success("Vendedor excluído com sucesso");
    },
  });

  return {
    deleteSeller,
    ...data,
  };
}
