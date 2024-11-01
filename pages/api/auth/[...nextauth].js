import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')

      async authorize(credentials, req) {
        return {
          auth: true,
          userId: credentials.userId,
          userEmail: credentials.userEmail,
          name: credentials.name,
          phone: credentials.phone,
          status: credentials.status,
          role: credentials.role,
          roleId: credentials.roleId,
          permissions: credentials.permissions,
          userImage: credentials.userImage,
          wishList: credentials.wishList,
        };
      },
    }),
  ],

  secret: process.env.JWT_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  session: {
     // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true,
    // Set a very large value for maxAge to prevent session expiry
    maxAge: 365 * 24 * 60 * 60, // 1 year

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
  },

  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = token.user;
        session.accessToken = token.token;
      }

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // Initial sign in
      if (account && user) {
        token.user = user;
        token.token = account.token;
      }
      return token;
    },
  },

  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
});
