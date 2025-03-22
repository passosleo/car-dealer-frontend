import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { useRouter } from "next/navigation";

export function useCreateSellerService() {
  const router = useRouter();
  const { mutate: createSeller, ...data } = useCustomMutate({
    routeName: "createSeller",
    setQueryKeys: ["createSeller"],
    invalidateQueryKeys: ["listSellers"],
    onSuccess: () => {
      router.replace("/admin/sellers");
    },
  });

  return {
    createSeller,
    ...data,
  };
}
