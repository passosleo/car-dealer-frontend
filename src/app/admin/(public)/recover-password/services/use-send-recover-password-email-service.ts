import { useCustomMutate } from "@/services/hooks/use-custom-mutate";

export function useSendRecoverPasswordEmailService() {
  const { mutate, ...data } = useCustomMutate<
    void,
    void,
    { email: string },
    void
  >({
    routeName: "sendRecoverPasswordEmail",
    setQueryKeys: ["sendRecoverPasswordEmail"],
    notHandleError: true,
  });
  return {
    sendRecoverPasswordEmail: mutate,
    ...data,
  };
}
