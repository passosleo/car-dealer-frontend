import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const authResponse = await handleAuthentication(req);
  if (authResponse) {
    return authResponse;
  }

  const logoutResponse = await handleLogout(req);
  if (logoutResponse) {
    return logoutResponse;
  }

  const headers = addHeaders(req, [["x-path", req.nextUrl.pathname]]);

  return NextResponse.next({
    request: {
      headers,
    },
  });
}

function addHeaders(req: NextRequest, headersToAdd: [string, string][] = []) {
  const headers = new Headers(req.headers);

  headersToAdd.forEach((header) => {
    headers.set(header[0], header[1]);
  });

  return headers;
}

async function handleAuthentication(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const cookieName = "auth_token";
  const authToken = req.cookies.get(cookieName)?.value;

  if (!authToken) {
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  try {
    const isValid = true; //call backend to validate token

    if (!isValid) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  } catch (error) {
    console.error("Erro ao validar o token com o backend:", error);
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  if (pathname === "/admin" || pathname === "/admin/login") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return null;
}

async function handleLogout(req: NextRequest) {
  if (req.nextUrl.pathname === "/admin/logout") {
    const headers = addHeaders(req, [
      [
        "Set-Cookie",
        "auth_token=; Path=/admin; Expires=Thu, 01 Jan 1900 00:00:00 GMT;",
      ],
    ]);
    return NextResponse.redirect(new URL("/admin/login", req.url), {
      headers,
    });
  }
}

export const config = {
  matcher: "/admin/:path*",
};
