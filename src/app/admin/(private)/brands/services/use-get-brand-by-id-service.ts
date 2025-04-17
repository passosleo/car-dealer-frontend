import { useCustomQuery } from "@/services/hooks/use-custom-query";
import { useRouter } from "next/navigation";
import { Brand } from "../types/brand";
import { useToaster } from "@/hooks/use-toaster";

export function useGetBrandByIdService(brandId: string) {
  const router = useRouter();
  const toaster = useToaster();

  const {
    data: res,
    isPending,
    isLoading,
    isFetching,
    ...data
  } = useCustomQuery<{ brandId: string }, void, Brand>({
    routeName: "getBrandById",
    queryKey: ["getBrandById", brandId],
    params: { brandId },
    notHandleError: true,
    onError: () => {
      toaster.error("Erro ao buscar marca");
      router.replace("/admin/brands");
    },
  });

  return {
    brand: res?.data,
    isPending: isPending || isLoading || isFetching,
    ...data,
  };
}
