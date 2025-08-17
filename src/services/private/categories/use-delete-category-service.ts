import { useToaster } from "@/hooks/use-toaster";
import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { useRouter } from "next/navigation";

export function useDeleteCategoryService() {
  const router = useRouter();
  const toaster = useToaster();

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
      toaster.success("Categoria excluída com sucesso");
    },
  });

  return {
    deleteCategory,
    ...data,
  };
}
