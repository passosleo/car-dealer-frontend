import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function useDeleteCategoryService() {
  const router = useRouter();

  const { mutate: deleteCategory, ...data } = useCustomMutate<
    { categoryId: string },
    void,
    void,
    void
  >({
    routeName: "deleteCategory",
    setQueryKeys: ["deleteCategory"],
    invalidateQueryKeys: ["listCategories"],
    onSuccess: () => {
      router.replace("/admin/categories");
      toast.success("Categoria excluída com sucesso");
    },
  });

  return {
    deleteCategory,
    ...data,
  };
}
