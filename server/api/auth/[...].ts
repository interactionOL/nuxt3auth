import { NuxtAuthHandler } from '#auth';
import DuendeIDS6Provider from 'next-auth/providers/duende-identity-server6';
import GithubProvider from 'next-auth/providers/github';

export default NuxtAuthHandler({
    secret: useRuntimeConfig().authJs.secret,
    origin: useRuntimeConfig().AUTH_ORIGIN,
	theme: {
		logo: 'https://nuxt.com/assets/design-kit/logo/icon-green.png',
	},
	providers: [
		// https://github.com/nextauthjs/next-auth/issues/572
		// @ts-ignore
		GithubProvider.default({
			clientId: '5a62d7874ff9f323ccf4',
			clientSecret: '597e47d60acde6e514ec83eeb3ff5e65fe268cd2',
		}),
		// @ts-ignore
		DuendeIDS6Provider.default({
			clientId: 'interactive.confidential', //runtimeConfig.github.clientId,
			clientSecret: 'secret',
			issuer: 'https://demo.duendesoftware.com',
			
		}),
	],
	callbacks: {
    	jwt ({ token, account, profile }) {
		console.log(account?.access_token)
			//console.log(profile)
			if (account?.access_token)
			{
				token.access_token = account.access_token;
			}
			return token;
		},
		session({ session, token }) {
			return {...session, access_token:token.access_token}
		}
	}

});
