import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Category, UpdateCategoryRequest } from "../types/category";

export function useUpdateCategoryService() {
  const router = useRouter();

  const { mutate: updateCategory, ...data } = useCustomMutate<
    { categoryId: string },
    void,
    UpdateCategoryRequest,
    Category
  >({
    routeName: "updateCategory",
    setQueryKeys: ["updateCategory"],
    invalidateQueryKeys: ["listCategories", "getCategoryById"],
    onSuccess: () => {
      router.replace("/admin/categories");
      toast.success("Categoria atualizada com sucesso");
    },
  });

  return {
    updateCategory,
    ...data,
  };
}
