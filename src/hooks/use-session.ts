import { SessionDTO } from "@/services/admin/auth/auth.type";
import { useCookies } from "./use-cookies";
import { useRouter } from "next/navigation";

export function useSession() {
  const { getCookie, setCookie } = useCookies();
  const router = useRouter();

  function getTokens() {
    const accessToken = getCookie<string>("accessToken");
    const refreshToken = getCookie<string>("refreshToken");
    return { accessToken, refreshToken };
  }

  function register({
    accessToken,
    accessTokenExpiresIn,
    refreshToken,
    refreshTokenExpiresIn,
  }: SessionDTO) {
    const accessTokenExpirationDate = new Date(
      Date.now() + accessTokenExpiresIn * 1000
    );

    const refreshTokenExpirationDate = new Date(
      Date.now() + refreshTokenExpiresIn * 1000
    );

    setCookie("accessToken", accessToken, {
      path: "/admin",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: accessTokenExpirationDate,
    });
    setCookie("refreshToken", refreshToken, {
      path: "/admin",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: refreshTokenExpirationDate,
    });
  }

  function invalidate() {
    setCookie("accessToken", "", {
      path: "/admin",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(0),
    });
    setCookie("refreshToken", "", {
      path: "/admin",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(0),
    });
    router.push("/admin/login?sessionExpired=true");
  }

  return { getTokens, register, invalidate };
}
