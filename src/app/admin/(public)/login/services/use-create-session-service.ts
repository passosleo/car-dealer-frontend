import { useSession } from "@/hooks/use-session";
import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { CreateSessionDTO, SessionDTO } from "@/services/types";
import { useRouter } from "next/navigation";

export function useCreateSessionService() {
  const session = useSession();
  const router = useRouter();

  const { mutate, ...data } = useCustomMutate<
    void,
    void,
    CreateSessionDTO,
    SessionDTO
  >({
    routeName: "createSession",
    setQueryKeys: ["session"],
    onSuccess: (res) => {
      session.register(res.data);
      router.replace("/admin/dashboard");
    },
  });
  return {
    createSession: mutate,
    ...data,
  };
}
