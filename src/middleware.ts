import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getTokenExpirationDate, isTokenValid } from "./utils/jwt";
import axios, { AxiosError } from "axios";
import { HOST } from "./services/router";
import { Session } from "./types/login";
import { DefaultResponse } from "./types/generic";
import { UserInfo } from "./types/user";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const res = NextResponse.next();

  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const userInfo = req.cookies.get("userInfo")?.value;

  if (!accessToken && !refreshToken) {
    return handleNoTokens(pathname, res, req);
  }

  if (accessToken && isTokenValid(accessToken)) {
    if (!userInfo) {
      await fetchAndSetUserInfo(accessToken, res);
    }
    return handleValidAccessToken(pathname, res, req);
  }

  if (!refreshToken || !isTokenValid(refreshToken)) {
    return block(req);
  }

  return await handleTokenRefresh(refreshToken, res, pathname, req);
}

async function fetchAndSetUserInfo(accessToken: string, res: NextResponse) {
  try {
    console.info("Fetching user info...");
    const { data: response } = await axios.get<DefaultResponse<UserInfo>>(
      `${HOST}/api/v1/admin/auth/user-info`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.statusCode === 200 && response.data) {
      const encoded = Buffer.from(JSON.stringify(response.data)).toString(
        "base64"
      );
      res.cookies.set("userInfo", encoded, {
        path: "/admin",
        httpOnly: false,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 30, // 30 minutos
      });
      console.info("User info fetched successfully!");
    }
  } catch (error) {
    const typedError = error as AxiosError;
    console.error("Error fetching user info", {
      status: typedError.response?.status,
      message: typedError.message,
      response: typedError.response?.data,
    });
  }
}

function handleNoTokens(pathname: string, res: NextResponse, req: NextRequest) {
  const publicRoutes = ["/admin/login", "/admin/recover-password"];
  if (publicRoutes.includes(pathname)) {
    return res;
  }
  return redirect(req, "/login");
}

function handleValidAccessToken(
  pathname: string,
  res: NextResponse,
  req: NextRequest
) {
  if (pathname === "/admin" || pathname === "/admin/login") {
    return redirect(req, "/dashboard");
  }
  return res;
}

async function handleTokenRefresh(
  refreshToken: string,
  res: NextResponse,
  pathname: string,
  req: NextRequest
) {
  try {
    console.info("Refreshing session...");
    const { data: response } = await axios.post<DefaultResponse<Session>>(
      `${HOST}/api/v1/admin/auth/refresh-token`,
      { refreshToken }
    );
    if (response.statusCode === 200 && response.data) {
      return handleSessionRefresh(response.data, res, pathname, req);
    }
    return block(req);
  } catch (error) {
    const typedError = error as AxiosError;
    console.error("Error fetching user info", {
      status: typedError.response?.status,
      message: typedError.message,
      response: typedError.response?.data,
    });
    return block(req);
  }
}

function handleSessionRefresh(
  session: Session,
  res: NextResponse,
  pathname: string,
  req: NextRequest
) {
  const [accessTokenExpirationDate, refreshTokenExpirationDate] =
    getTokenExpirationDate(session.accessToken, session.refreshToken);

  setCookies(
    res,
    session.accessToken,
    session.refreshToken,
    accessTokenExpirationDate,
    refreshTokenExpirationDate
  );

  console.info("Session refreshed successfully!");

  if (pathname === "/admin" || pathname === "/admin/login") {
    return redirect(req, "/dashboard");
  }

  return res;
}

function setCookies(
  res: NextResponse,
  accessToken: string,
  refreshToken: string,
  accessTokenExpirationDate: Date,
  refreshTokenExpirationDate: Date
) {
  res.cookies.set("accessToken", accessToken, {
    path: "/admin",
    httpOnly: false,
    secure: true,
    sameSite: "strict",
    expires: accessTokenExpirationDate,
  });
  res.cookies.set("refreshToken", refreshToken, {
    path: "/admin",
    httpOnly: false,
    secure: true,
    sameSite: "strict",
    expires: refreshTokenExpirationDate,
  });
}

function redirect(req: NextRequest, path: string) {
  const res = NextResponse.redirect(new URL(`/admin${path}`, req.url));
  return res;
}

function block(req: NextRequest) {
  const res = NextResponse.redirect(
    new URL("/api/logout?sessionExpired=true", req.url)
  );
  return res;
}

export const config = {
  matcher: "/admin/:path*",
};
