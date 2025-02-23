import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  console.log("🚨 Middleware is processing:", pathname);

  const noneLoginPathname = ["/login", "/auth", "/resetPw"];

  const token =
    request.cookies.get("authToken")?.value ||
    request.cookies.get("GoogleAuthToken")?.value;

  // 비로그인 상태에서 /login, /signup을 제외한 다른 경로로 접근 시 로그인 페이지로 리디렉션
  if (!token && !noneLoginPathname.includes(pathname)) {
    console.log("Redirecting to /login");
    console.log("----------------------------------");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 로그인 상태에서 /login 또는 /signup 페이지로 접근 시 메인 페이지로 리디렉션
  if (token && noneLoginPathname.includes(pathname)) {
    console.log("Redirecting to /");
    console.log("----------------------------------");
    return NextResponse.redirect(new URL("/", request.url));
  }

  const requestHeaders = new Headers(request.headers);

  requestHeaders.set("x-url", request.url);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|/public|api/).*)",
  ],
};
