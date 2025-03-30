import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Brand, CreateBrandRequest } from "../types/brand";

export function useCreateBrandService() {
  const router = useRouter();

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
      toast.success("Marca criada com sucesso");
    },
    onError: (error: AxiosError) => {
      if (error.status === 409) {
        toast.error("Já existe uma marca com esse nome");
      } else {
        toast.error("Algo deu errado, tente novamente mais tarde");
      }
    },
  });

  return {
    createBrand,
    ...data,
  };
}
