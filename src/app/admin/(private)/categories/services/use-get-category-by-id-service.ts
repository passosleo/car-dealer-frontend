import { useCustomQuery } from "@/services/hooks/use-custom-query";
import { useRouter } from "next/navigation";
import { Category } from "../types/category";
import { useToaster } from "@/hooks/use-toaster";

export function useGetCategoryByIdService(categoryId: string) {
  const router = useRouter();
  const toaster = useToaster();

  const {
    data: res,
    isPending,
    isLoading,
    isFetching,
    ...data
  } = useCustomQuery<{ categoryId: string }, void, Category>({
    routeName: "getCategoryById",
    queryKey: ["getCategoryById", categoryId],
    params: { categoryId },
    notHandleError: true,
    onError: () => {
      toaster.error("Erro ao buscar categoria");
      router.replace("/admin/categories");
    },
  });

  return {
    category: res?.data,
    isPending: isPending || isLoading || isFetching,
    ...data,
  };
}
