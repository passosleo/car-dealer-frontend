import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const res = NextResponse.redirect(new URL("/admin/login", req.url));
  const sessionExpired = req.nextUrl.searchParams.get("sessionExpired");

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

  if (sessionExpired) {
    res.headers.set(
      "Location",
      `${res.headers.get("Location")}?sessionExpired=${sessionExpired}`
    );
  }

  return res;
}
