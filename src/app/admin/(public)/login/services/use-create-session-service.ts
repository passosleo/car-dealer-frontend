import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { CreateSessionDTO, SessionDTO } from "@/services/types";

export function useCreateSessionService() {
  return useCustomMutate<CreateSessionDTO, SessionDTO>({
    routeName: "createSession",
    setQueryKeys: ["session"],
  });
}
