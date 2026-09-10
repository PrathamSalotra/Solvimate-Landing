import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyAdminLoginWithOtp } from "@/services/auth.service";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Solvimate Admin",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        otp: { label: "OTP", type: "text" },
        challengeId: { label: "Challenge ID", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password || !credentials?.otp || !credentials?.challengeId) {
          return null;
        }

        try {
          const admin = await verifyAdminLoginWithOtp(credentials);
          
          if (admin) {
            return {
              id: admin._id.toString(),
              email: admin.email,
              name: admin.name || "Admin",
              role: admin.role,
            };
          }
          return null;
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
