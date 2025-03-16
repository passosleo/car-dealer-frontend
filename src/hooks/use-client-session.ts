import { SessionDTO } from "@/services/admin/auth/auth.type";
import { useCookies } from "./use-cookies";
import { redirect } from "next/navigation";
import { getTokenExpirationDate } from "@/utils/jwt";

export function useClientSession() {
  const { getCookie, setCookie } = useCookies();

  function getTokens() {
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");
    return { accessToken, refreshToken };
  }

  function register({ accessToken, refreshToken }: SessionDTO) {
    const [accessTokenExpirationDate, refreshTokenExpirationDate] =
      getTokenExpirationDate(accessToken, refreshToken);

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

  function expire() {
    redirect("/api/logout?sessionExpired=true");
  }

  return { getTokens, register, invalidate: expire };
}
