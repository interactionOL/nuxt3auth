<script lang="ts" setup>
definePageMeta({
	middleware: 'auth',
});

const { signIn, signOut, status, getProviders, data } = useAuth();
</script>

<template>
	<div>
		<h1>Secure</h1>
		<NuxtLink to="/">Home</NuxtLink>

		<div>
			<pre>{{ status }}</pre>
			<pre>{{ data?.user }}</pre>
			<!-- <pre>{{ cookies }}</pre> -->
		</div>

		<hr />
		<div>
			<button @click="() => signOut({ callbackUrl: '/login' })">Sign out</button>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
