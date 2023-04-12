import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

/**
 * For more info see https://next-auth.js.org/configuration/initialization#route-handlers-app
 */
const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user }) {
      return user.email === process.env.WHITELISTED_EMAIL;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
