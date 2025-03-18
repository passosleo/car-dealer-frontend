import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getTokenExpirationDate, isTokenValid } from "./utils/jwt";
import { DefaultResponse, SessionDTO } from "./services/types";
import axios from "axios";
import { HOST } from "./services/router";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const res = NextResponse.next();

  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!accessToken && !refreshToken) {
    return handleNoTokens(pathname, res, req);
  }

  if (accessToken && isTokenValid(accessToken)) {
    return handleValidAccessToken(pathname, res, req);
  }

  if (!refreshToken || !isTokenValid(refreshToken)) {
    return block(req);
  }

  return await handleTokenRefresh(refreshToken, res, pathname, req);
}

function handleNoTokens(pathname: string, res: NextResponse, req: NextRequest) {
  return pathname === "/admin/login" ? res : block(req);
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
    const { data: response } = await axios.post<DefaultResponse<SessionDTO>>(
      `${HOST}/api/v1/admin/auth/refresh-token`,
      { refreshToken }
    );
    if (response.statusCode === 200 && response.data) {
      return handleSessionRefresh(response.data, res, pathname, req);
    }
    return block(req);
  } catch (error) {
    console.error("Error refreshing tokens", error);
    return block(req);
  }
}

function handleSessionRefresh(
  session: SessionDTO,
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
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: accessTokenExpirationDate,
  });
  res.cookies.set("refreshToken", refreshToken, {
    path: "/admin",
    httpOnly: true,
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
