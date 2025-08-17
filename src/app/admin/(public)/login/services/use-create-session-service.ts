import { useSession } from "@/hooks/use-session";
import { useCustomMutate } from "@/services/hooks/use-custom-mutate";
import { CreateSessionRequest, Session } from "@/types/login";
import { useRouter } from "next/navigation";

export function useCreateSessionService() {
  const session = useSession();
  const router = useRouter();

  const { mutate: createSession, ...data } = useCustomMutate<
    void,
    void,
    CreateSessionRequest,
    Session
  >({
    routeName: "createSession",
    setQueryKeys: ["session"],
    onSuccess: (res) => {
      session.register(res.data);
      router.replace("/admin/dashboard");
    },
  });
  return {
    createSession,
    ...data,
  };
}
