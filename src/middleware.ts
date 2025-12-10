import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";
import { cookies } from "next/headers";

// 1. Specify protected and public routes
const protectedRoutes = ["/admin/dashboard", "/admin/projects", "/admin/about"];
const publicRoutes = ["/admin", "/login"];

export default async function middleware(req: NextRequest) {
    // 2. Check if the current route is protected or public
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
    const isPublicRoute = publicRoutes.includes(path) || path === "/admin" || path === "/login";

    // 3. Decrypt the session from the cookie
    const cookie = req.cookies.get("session")?.value;
    const session = await decrypt(cookie);

    // console.log(`[Middleware] Path: ${path}, Protected: ${isProtectedRoute}, Public: ${isPublicRoute}, UserID: ${session?.userId}`);

    // 4. Redirect to /admin if the user is not authenticated
    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL("/admin", req.nextUrl));
    }

    // 5. Redirect to /admin/dashboard if the user is authenticated and trying to access login
    if (
        isPublicRoute &&
        session?.userId &&
        !req.nextUrl.pathname.startsWith("/admin/dashboard")
    ) {
        return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl));
    }

    return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
