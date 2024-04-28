import { NuxtAuthHandler } from "#auth";
import DuendeIDS6Provider from "next-auth/providers/duende-identity-server6";
import GithubProvider from "next-auth/providers/github";
import GetRefreshToken from "~/services/TokenService";


export default NuxtAuthHandler({
  secret: useRuntimeConfig().authJs.secret,
  origin: useRuntimeConfig().AUTH_ORIGIN,
  theme: {
    logo: "https://nuxt.com/assets/design-kit/logo/icon-green.png",
  },
  providers: [
    // https://github.com/nextauthjs/next-auth/issues/572
    // @ts-ignore
    GithubProvider.default({
      clientId: "5a62d7874ff9f323ccf4",
      clientSecret: "597e47d60acde6e514ec83eeb3ff5e65fe268cd2",
    }),
    // @ts-ignore
    DuendeIDS6Provider.default({
      clientId: "interactive.confidential.short", //runtimeConfig.github.clientId,
      clientSecret: "secret",
      issuer: "https://demo.duendesoftware.com",
      authorization: { params: { scope: "openid profile email offline_access" } },
    }),
  ],
  callbacks: {
    jwt({ token, account, profile }) {
      console.log("Token:");
      console.log(token);
      console.log("Account:");
      console.log(account);
      console.log("Profile:");
      console.log(profile);

      if (account?.access_token) {
        token.access_token = account.access_token;
        token.access_token_expiry = account.expires_at;
        token.refreshToken = account.refresh_token;
      }
      let now = new Date(Date.now());
      now.setTime(now.getTime() + 1000 * 15);
      console.log("Now is ", now.getTime()/1000);
      console.log("token is ", token.access_token_expiry);
      if ((now.getTime()/1000) < token.access_token_expiry) {
        return token;
      }

      return GetRefreshToken(token);
    },
    session({ session, token }) {
      console.log("Calling session");
      return {
        ...session,
        access_token: token.access_token,
        access_token_expiry: token.access_token_expiry,
      };
    },
  },
});
