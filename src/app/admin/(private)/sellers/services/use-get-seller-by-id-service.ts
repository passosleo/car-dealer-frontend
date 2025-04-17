import { useCustomQuery } from "@/services/hooks/use-custom-query";
import { Seller } from "../types/seller";
import { useRouter } from "next/navigation";
import { useToaster } from "@/hooks/use-toaster";

export function useGetSellerByIdService(sellerId: string) {
  const router = useRouter();
  const toaster = useToaster();

  const {
    data: res,
    isPending,
    isLoading,
    isFetching,
    ...data
  } = useCustomQuery<{ sellerId: string }, void, Seller>({
    routeName: "getSellerById",
    queryKey: ["getSellerById", sellerId],
    params: { sellerId },
    notHandleError: true,
    onError: () => {
      toaster.error("Erro ao buscar vendedor");
      router.replace("/admin/sellers");
    },
  });

  return {
    seller: res?.data,
    isPending: isPending || isLoading || isFetching,
    ...data,
  };
}
