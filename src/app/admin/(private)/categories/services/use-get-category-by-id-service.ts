import { useCustomQuery } from "@/services/hooks/use-custom-query";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Category } from "../types/category";

export function useGetCategoryByIdService(categoryId: string) {
  const router = useRouter();

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
      toast.error("Erro ao buscar categoria");
      router.replace("/admin/categories");
    },
  });

  return {
    category: res?.data,
    isPending: isPending || isLoading || isFetching,
    ...data,
  };
}
