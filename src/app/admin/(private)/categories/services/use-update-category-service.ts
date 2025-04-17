import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { useRouter } from "next/navigation";
import { Category, UpdateCategoryRequest } from "../types/category";
import { useToaster } from "@/hooks/use-toaster";

export function useUpdateCategoryService() {
  const router = useRouter();
  const toaster = useToaster();

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
      toaster.success("Categoria atualizada com sucesso");
    },
  });

  return {
    updateCategory,
    ...data,
  };
}
