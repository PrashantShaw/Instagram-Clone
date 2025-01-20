import { auth as middleware } from "@/auth";
import { NextResponse } from "next/server";

const protectedRoutes = ["/profile", "/create", "/settings"];

const authRoutes = ["/signup", "/login"];

export default middleware((request) => {
  const { auth, nextUrl } = request;
  const isLoggedIn = !!auth;
  const FEEDS_PAGE_PATHNAME = "/";
  const isAuthRoute = authRoutes.some((route) =>
    nextUrl.pathname.startsWith(route)
  );
  const isProtectedRoute = (() => {
    if (nextUrl.pathname === FEEDS_PAGE_PATHNAME) return true;
    return protectedRoutes.some((route) => nextUrl.pathname.startsWith(route));
  })();
  //   console.log(auth, nextUrl.pathname);
  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL(authRoutes[1], nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  } else if (isAuthRoute && isLoggedIn) {
    const feedsPageUrl = new URL(FEEDS_PAGE_PATHNAME, nextUrl.origin);
    return NextResponse.redirect(feedsPageUrl);
  }
});

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|instagram.png).*)",
  ],
};
