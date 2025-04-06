import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/login", // <- match your authOptions
    },
});

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/profile/:path*",
        "/settings/:path*",
        // add all the protected routes here
    ],
};
