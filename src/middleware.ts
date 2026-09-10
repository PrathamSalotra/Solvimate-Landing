import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/admin/login",
    },
  }
);

export const config = {
  matcher: [
    "/admin/dashboard/:path*",
    "/admin/certificates/:path*",
    "/admin/analytics/:path*",
    "/admin/settings/:path*",
    "/admin/cms/:path*",
  ],
};
