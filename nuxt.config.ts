// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "node:path";

export default defineNuxtConfig({
  alias: {
    cookie: resolve(__dirname, "node_modules/cookie"),
  },
  devtools: { enabled: true },
  modules: ["nuxt-oidc-auth"],
  plugins: [
    //'~/plugins/axios.ts'
  ],
  // devServer: {
  // 	port: 44331,
  // 	https: {
  // 	  key: 'server.key',
  // 	  cert: 'server.crt'
  // 	}
  // },
  oidc: {
    defaultProvider: "oidc",
    provideDefaultSecrets: false,
    providers: {
      oidc: {
        clientId: process.env.NUXT_OIDC_PROVIDERS_OIDC_CLIENT_ID ?? "",
        clientSecret: process.env.NUXT_OIDC_PROVIDERS_OIDC_CLIENT_SECRET ?? "",
        authorizationUrl: "https://localhost:44311/connect/authorize",
        tokenUrl: "https://localhost:44311/connect/token",
        redirectUri: "http://localhost:3000/auth/oidc/callback",
        //baseUrl: "https://demo.duendesoftware.com",
        scope: ["openid", "offline_access"],
        pkce: true,
        tokenRequestType: "form-urlencoded"
      },
    },
    middleware: {
      globalMiddlewareEnabled: false,
      customLoginPage: false,
    },
  },
  runtimeConfig: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_ORIGIN: process.env.AUTH_ORIGIN,
    authJs: {
      secret: "fvRaEefFkPRaXgaNRyy72vIGdYXsS/h/iaGqerhu/JY=",
      // baseUrl: "https://localhost:44331",
    },
    public: {
      authJs: {
        // baseUrl: 'http://localhost:44331',
        // verifyClientOnEveryRequest: true,
      },
    },
  },
});
