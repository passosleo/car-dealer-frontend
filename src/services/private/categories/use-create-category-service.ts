import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { useRouter } from "next/navigation";
import { Category, CreateCategoryRequest } from "@/types/category";
import { useToaster } from "@/hooks/use-toaster";

export function useCreateCategoryService() {
  const router = useRouter();
  const toaster = useToaster();

  const { mutate: createCategory, ...data } = useCustomMutate<
    void,
    void,
    CreateCategoryRequest,
    Category
  >({
    routeName: "createCategory",
    setQueryKeys: ["createCategory"],
    invalidateQueryKeys: ["listCategories"],
    notHandleError: true,
    retry: false,
    onSuccess: () => {
      router.replace("/admin/categories");
      toaster.success("Categoria criada com sucesso");
    },
    onError: (error) => {
      if (error.status === 409) {
        toaster.warning("Já existe uma categoria com esse nome");
      } else {
        toaster.error("Algo deu errado, tente novamente mais tarde");
      }
    },
  });

  return {
    createCategory,
    ...data,
  };
}
