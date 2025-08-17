import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { useRouter } from "next/navigation";
import { useToaster } from "@/hooks/use-toaster";
import { Brand, CreateBrandRequest } from "@/types/brand";

export function useCreateBrandService() {
  const router = useRouter();
  const toaster = useToaster();

  const { mutate: createBrand, ...data } = useCustomMutate<
    void,
    void,
    CreateBrandRequest,
    Brand
  >({
    routeName: "createBrand",
    setQueryKeys: ["createBrand"],
    invalidateQueryKeys: ["listBrands"],
    notHandleError: true,
    retry: false,
    onSuccess: () => {
      router.replace("/admin/brands");
      toaster.success("Marca criada com sucesso");
    },
    onError: (error) => {
      if (error.status === 409) {
        toaster.warning("Já existe uma marca com esse nome");
      } else {
        toaster.error("Algo deu errado, tente novamente mais tarde");
      }
    },
  });

  return {
    createBrand,
    ...data,
  };
}
