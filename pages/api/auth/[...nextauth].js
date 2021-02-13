import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import config from "../../../constants/config";

export default NextAuth({
  providers: [
    Providers.Email({
        server: config.emailServerAddress,
        from: config.emailFrom
    })
  ],
  database: config.identityDbUrl,
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true, 

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async session(session, token) {
      return session;
    },
    // async redirect(url, baseUrl) {
    //   return "/admin";
    // }
  }
}); 