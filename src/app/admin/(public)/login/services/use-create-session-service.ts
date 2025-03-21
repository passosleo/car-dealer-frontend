import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { CreateSessionDTO, SessionDTO } from "@/services/types";

export function useCreateSessionService() {
  const { mutate, ...data } = useCustomMutate<
    void,
    void,
    CreateSessionDTO,
    SessionDTO
  >({
    routeName: "createSession",
    setQueryKeys: ["session"],
  });
  return {
    createSession: mutate,
    ...data,
  };
}
