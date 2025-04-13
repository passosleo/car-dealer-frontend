import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Category, CreateCategoryRequest } from "../types/category";

export function useCreateCategoryService() {
  const router = useRouter();

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
      toast.success("Categoria criada com sucesso");
    },
    onError: (error) => {
      if (error.status === 409) {
        toast.error("Já existe uma categoria com esse nome");
      } else {
        toast.error("Algo deu errado, tente novamente mais tarde");
      }
    },
  });

  return {
    createCategory,
    ...data,
  };
}
