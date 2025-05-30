import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const pathname = request.nextUrl.pathname;

  // Define public routes that don't require authentication
  const publicRoutes = ["/login", "/register", "/forgot-password"];

  // Define API routes that should be excluded from auth check
  const apiRoutes = ["/api/auth"];

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if the current path is an API route that should be excluded
  const isExcludedApiRoute = apiRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Skip middleware for static files and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.includes(".") || // Skip files with extensions
    isExcludedApiRoute
  ) {
    return NextResponse.next();
  }

  // Check for authentication token (adjust based on your auth method)
  const token =
    request.cookies.get("admin-auth-token")?.value ||
    request.cookies.get("next-auth.session-token")?.value || // NextAuth
    request.cookies.get("__session")?.value; // Firebase Auth

  // Alternative: Check Authorization header
  const authHeader = request.headers.get("authorization");
  const bearerToken = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  const isAuthenticated = !!(token || bearerToken);

  // If user is authenticated and trying to access public routes (login, register, etc.)
  // redirect them to the home page or dashboard
  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (pathname === "/") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else if (!isAuthenticated) {
      // Store the original URL to redirect back after login
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If user is not authenticated and trying to access protected routes
  // redirect them to login
  if (!isAuthenticated && !isPublicRoute) {
    // Store the original URL to redirect back after login
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  // Match all routes except static files and API routes
  matcher: [
    "/dashboard/:path*", // Match all dashboard routes
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
