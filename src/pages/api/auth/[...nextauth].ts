import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

/**
 * For more info see https://next-auth.js.org/configuration/initialization#route-handlers-app
 *
 * move back to https://github.com/swissonid/the-hourglass-app/commit/4490d684451111714dc7f46acfa892f49883e805
 * when they have fixed https://github.com/nextauthjs/next-auth/issues/7229
 *
 */
const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

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
export default NextAuth(authOptions);
