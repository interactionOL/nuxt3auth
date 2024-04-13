import DuendeIDS6Provider from "@auth/core/providers/duende-identity-server6"
import GithubProvider from "@auth/core/providers/github"
import type { AuthConfig } from "@auth/core/types"
import { NuxtAuthHandler } from "#auth"

const runtimeConfig = useRuntimeConfig()

export const authOptions: AuthConfig = {
  secret: runtimeConfig.authJs.secret,
  theme: {
    logo: "https://nuxt.com/assets/design-kit/logo/icon-green.png"
  },
    providers: [
      GithubProvider({
      clientId: "5a62d7874ff9f323ccf4",
      clientSecret: "597e47d60acde6e514ec83eeb3ff5e65fe268cd2"
    }),
    DuendeIDS6Provider({
      clientId:  "interactive.confidential", //runtimeConfig.github.clientId,
      clientSecret: "secret12",
      issuer: "https://demo.duendesoftware.com",
    })
  ]
}

export default NuxtAuthHandler(authOptions, runtimeConfig)