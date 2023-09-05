import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";



const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET_ID as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
});



export { handler as GET, handler as POST };