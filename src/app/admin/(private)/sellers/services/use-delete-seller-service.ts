import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function useDeleteSellerService() {
  const router = useRouter();

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
      toast.success("Vendedor excluído com sucesso");
    },
  });

  return {
    deleteSeller,
    ...data,
  };
}
