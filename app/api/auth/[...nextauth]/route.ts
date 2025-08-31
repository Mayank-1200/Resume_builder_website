import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient();

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
<<<<<<< HEAD
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('NextAuth signIn callback:', { 
        hasUser: !!user, 
        hasAccount: !!account,
        accountProvider: account?.provider,
        userId: user?.id,
        userEmail: user?.email
      });
      
      // Allow all sign-ins
      return true;
    },
    async jwt({ token, user, account }) {
      console.log('NextAuth JWT callback:', { 
        hasToken: !!token, 
        hasUser: !!user, 
        hasAccount: !!account,
        accountProvider: account?.provider,
        userId: user?.id
      });
      
      if (user) {
        token.id = user.id;
        token.firstName = (user as any).firstName;
        token.lastName = (user as any).lastName;
        console.log('User data added to token:', { id: user.id, firstName: (user as any).firstName });
      }
      return token;
    },
    async session({ session, token }) {
      console.log('NextAuth session callback:', { 
        hasSession: !!session, 
        hasToken: !!token,
        tokenId: token.id,
        sessionUserId: session.user?.id
      });
      
      if (session.user) {
        session.user.id = token.id as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        console.log('Session user data updated:', { 
          id: session.user.id, 
          firstName: session.user.firstName 
        });
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log('NextAuth redirect callback:', { url, baseUrl });
      
      // Allow relative URLs and URLs from the same origin
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      
      // Default to base URL if external
      return baseUrl;
    },
  },
=======
>>>>>>> 7669d29b5a09ea62a49a08c04507400bf932b763
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
    callbackUrl: {
      name: `next-auth.callback-url`,
      options: {
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
    csrfToken: {
      name: `next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
<<<<<<< HEAD
=======
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.firstName = (user as any).firstName;
        token.lastName = (user as any).lastName;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allow relative URLs and URLs from the same origin
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      
      // Default to base URL if external
      return baseUrl;
    },
  },
      pages: {
      signIn: '/login',
      error: '/login',
    },
>>>>>>> 7669d29b5a09ea62a49a08c04507400bf932b763
  debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };
