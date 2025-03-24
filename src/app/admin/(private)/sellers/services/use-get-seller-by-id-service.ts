import { useCustomQuery } from "@/services/hooks/use-custom-query";
import { Seller } from "../types/seller";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function useGetSellerByIdService(sellerId: string) {
  const router = useRouter();

  const { data: res, ...data } = useCustomQuery<
    { sellerId: string },
    void,
    Seller
  >({
    routeName: "getSellerById",
    queryKey: ["getSellerById", sellerId],
    params: { sellerId },
    notHandleError: true,
    onError: () => {
      toast.error("Erro ao buscar vendedor");
      router.replace("/admin/sellers");
    },
  });

  return {
    seller: res?.data,
    ...data,
  };
}
