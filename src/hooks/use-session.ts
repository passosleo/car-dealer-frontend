import axios from "axios";
import { useCookies } from "./use-cookies";
import { redirect } from "next/navigation";
import { getTokenExpirationDate } from "@/utils/jwt";
import { HOST } from "@/services/router";
import { Session } from "@/types/login";
import { DefaultResponse } from "@/types/generic";

export function useSession() {
  const { getCookie, setCookie } = useCookies();

  function getTokens() {
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");
    return { accessToken, refreshToken };
  }

  async function refresh() {
    console.info("Refreshing session...");
    const { refreshToken } = getTokens();
    if (!refreshToken) return;
    const { data: res } = await axios.post<DefaultResponse<Session>>(
      `${HOST}/api/v1/admin/auth/refresh-token`,
      { refreshToken }
    );
    if (res.statusCode === 200 && res.data) {
      register(res.data);
      console.info("Session refreshed successfully!");
      return res.data;
    }
  }

  function register({ accessToken, refreshToken }: Session) {
    const [accessTokenExpirationDate, refreshTokenExpirationDate] =
      getTokenExpirationDate(accessToken, refreshToken);

    setCookie("accessToken", accessToken, {
      path: "/admin",
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      expires: accessTokenExpirationDate,
    });
    setCookie("refreshToken", refreshToken, {
      path: "/admin",
      httpOnly: false,
      secure: true,
      sameSite: "strict",
      expires: refreshTokenExpirationDate,
    });
  }

  function expire() {
    redirect("/api/logout?sessionExpired=true");
  }

  return { getTokens, register, refresh, expire };
}
