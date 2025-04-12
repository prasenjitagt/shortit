// middleware.ts

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(request) {
        const { pathname } = request.nextUrl;

        // 👇 If logged-in user tries to access landing page "/"
        if (pathname === "/") {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }

        // Otherwise let next-auth handle protected routes
    },
    {
        pages: {
            signIn: "/login",
        },
    }
);

export const config = {
    matcher: [
        //add protected routes here
        "/dashboard/:path*",
        "/home/:path*",
        "/my_urls/:path*",
        "/profile/:path*",
        "/settings/:path*",
    ],
};
