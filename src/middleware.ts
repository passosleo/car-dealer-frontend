import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isTokenValid } from "./utils/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle logout
  if (pathname === "/admin/logout") {
    return block(request);
  }

  // Handle authentication
  const refreshTokenCookie = request.cookies.get("refreshToken")?.value;

  if (!refreshTokenCookie) {
    if (pathname === "/admin/login") {
      return allow(request);
    }
    return block(request);
  }

  if (!isTokenValid(refreshTokenCookie)) {
    return block(request);
  }

  if (pathname === "/admin" || pathname === "/admin/login") {
    return redirect(request, "/dashboard");
  }

  return allow(request);
}

function redirect(request: NextRequest, path: string) {
  const res = NextResponse.redirect(new URL(`/admin${path}`, request.url));
  const { pathname } = request.nextUrl;
  res.cookies.set("x-path", pathname);
  return res;
}

function allow(request: NextRequest) {
  const res = NextResponse.next();
  const { pathname } = request.nextUrl;
  res.cookies.set("x-path", pathname);
  return res;
}

function block(request: NextRequest) {
  const res = NextResponse.redirect(new URL("/admin/login", request.url));
  // Clear cookies
  res.cookies.set("accessToken", "", {
    path: "/admin",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(0),
  });
  res.cookies.set("refreshToken", "", {
    path: "/admin",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(0),
  });
  return res;
}

export const config = {
  matcher: "/admin/:path*",
};
