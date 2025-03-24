// src/app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm/expressions";
import bcrypt from "bcrypt";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "your-email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        // Query the user from the database
        const userResult = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email));
        const user = userResult[0];

        if (!user) {
          throw new Error("Invalid email or password");
        }

        // Compare hashed password with the provided password
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password_hash
        );
        if (!isValid) {
          throw new Error("Invalid email or password.");
        }

        // Return user data to include in the session
        return {
          id: user.id,
          name: user.username,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
