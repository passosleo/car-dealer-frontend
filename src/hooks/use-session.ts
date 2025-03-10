import { SessionDTO } from "@/services/admin/auth/auth.type";
import { useCookies } from "./use-cookies";

export function useSession() {
  const { setCookie } = useCookies();

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

  return { register };
}
