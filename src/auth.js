import NextAuth from "next-auth";
import authConfig from "./auth.config.js";

import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

const prisma = new PrismaClient();

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token, user }) {
      // Attach the user id to the session object.
      // For JWT strategy, token.sub usually contains the user id.
      session.user.id = token.sub || user?.id;
      return session;
    },
  }, // Close the callbacks object here, and then spread authConfig
  ...authConfig,
});
