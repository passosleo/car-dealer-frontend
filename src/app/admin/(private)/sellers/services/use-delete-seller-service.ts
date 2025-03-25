import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { toast } from "react-toastify";

export function useDeleteSellerService() {
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
      toast.success("Vendedor excluído com sucesso");
    },
  });

  return {
    deleteSeller,
    ...data,
  };
}
