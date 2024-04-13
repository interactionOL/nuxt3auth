// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "node:path";

export default defineNuxtConfig({
  alias: {
    cookie: resolve(__dirname, "node_modules/cookie")
  },
  devtools: { enabled: true },
  modules: ["@hebilicious/authjs-nuxt"],
  devServer: {
    
    //port: 44331,
    // https: {
    //   key: 'server.key',
    //   cert: 'server.crt'
    // }
  },
  runtimeConfig: {
    authJs: {
      secret: "fvRaEefFkPRaXgaNRyy72vIGdYXsS/h/iaGqerhu/JY=",
      // baseUrl: "https://localhost:44331",
    },
    public: {
      authJs: {
        baseUrl: "http://localhost:44331",
        verifyClientOnEveryRequest: true,
      }
    }
  }
})