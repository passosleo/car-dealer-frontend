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
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (!refreshToken) {
    if (pathname === "/admin/login") {
      return allow();
    }
    return block(request);
  }

  if (!isTokenValid(refreshToken)) {
    return block(request);
  }

  if (pathname === "/admin" || pathname === "/admin/login") {
    return redirect(request, "/dashboard");
  }

  return allow();
}

const allow = () => NextResponse.next();

function redirect(request: NextRequest, path: string) {
  const res = NextResponse.redirect(new URL(`/admin${path}`, request.url));
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
