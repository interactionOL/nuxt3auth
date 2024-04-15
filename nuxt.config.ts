// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'node:path';

export default defineNuxtConfig({
	alias: {
		cookie: resolve(__dirname, 'node_modules/cookie'),
	},
	devtools: { enabled: true },
	modules: ['@sidebase/nuxt-auth'],
	devServer: {
		port: 44331,
		https: {
		  key: 'server.key',
		  cert: 'server.crt'
		}
	},
  runtimeConfig: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_ORIGIN: process.env.AUTH_ORIGIN,
		authJs: {
			secret: 'fvRaEefFkPRaXgaNRyy72vIGdYXsS/h/iaGqerhu/JY=',
			// baseUrl: "https://localhost:44331",
		},
		public: {
			authJs: {
				// baseUrl: 'http://localhost:44331',
				// verifyClientOnEveryRequest: true,
			},
		},
	},
  // https://sidebase.io/nuxt-auth/v0.6/configuration/nuxt-config#provider-authjs-baseurl
  
  auth: {
    baseURL: 'https://localhost:44331',

    origin: process.env.NEXTAUTH_URL,
    // Whether to periodically refresh the session. Change this to `true` for a refresh every seconds or set this to a number like `5000` for a refresh every 5000 milliseconds (aka: 5 seconds)
    enableSessionRefreshPeriodically: false,
    // Whether to refresh the session whenever a window focus event happens, i.e, when your user refocuses the window. Set this to `false` to turn this off
    enableSessionRefreshOnWindowFocus: false,
    // Whether to add a global authentication middleware that will protect all pages without exclusion
    globalAppMiddleware: false,
    // Select the default-provider to use when `signIn` is called. Setting this here will also effect the global middleware behavior: E.g., when you set it to `github` and the user is unauthorized, they will be directly forwarded to the Github OAuth page instead of seeing the app-login page
    defaultProvider: 'auth0',
    // Configuration of the global auth-middleware (only applies if you set `globalAppMiddleware: true` above!)
    globalMiddlewareOptions: {
      // Whether to allow access to 404 pages without authentication. Set this to `false` to force users to sign-in before seeing `404` pages. Setting this to false may lead to vue-router problems (as the target page does not exist)
      allow404WithoutAuth: true,
      // Whether to automatically set the callback url to the page the user tried to visit when the middleware stopped them. This is useful to disable this when using the credentials provider, as it does not allow a `callbackUrl`. Setting this to a string-value will result in that being used as the callbackUrl path. Note: You also need to set the global `addDefaultCallbackUrl` setting to `false` if you want to fully disable this for the global middleware.
      addDefaultCallbackUrl: true
    }
	},
});
