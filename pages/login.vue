<script lang="ts" setup>
//const { signIn, signOut, status, getProviders } = useAuth();

definePageMeta({
	auth: {
		unauthenticatedOnly: true,
		navigateAuthenticatedTo: '/secure',
	},
});
</script>

<template>
	<div>
		<h1>Login</h1>

		{{ JSON.stringify(getProviders()) }}

		<router-link to="/secure">Token Details</router-link> |
		<router-link to="/">Home</router-link>
	</div>
</template>
