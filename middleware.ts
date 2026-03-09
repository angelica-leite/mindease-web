import { NextResponse, type NextRequest } from "next/server";

const AUTH_COOKIE_NAME = "mindease_session";
const PUBLIC_ROUTES = new Set(["/login", "/cadastro"]);
const PROTECTED_PREFIXES = ["/dashboard", "/tasks", "/pomodoro", "/profile", "/settings"];

function isProtectedPath(pathname: string) {
  return PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = request.cookies.get(AUTH_COOKIE_NAME)?.value === "1";

  if (pathname === "/") {
    const target = hasSession ? "/dashboard" : "/login";
    return NextResponse.redirect(new URL(target, request.url));
  }

  if (PUBLIC_ROUTES.has(pathname) && hasSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isProtectedPath(pathname) && !hasSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/cadastro",
    "/dashboard/:path*",
    "/tasks/:path*",
    "/pomodoro/:path*",
    "/profile/:path*",
    "/settings/:path*",
  ],
};
