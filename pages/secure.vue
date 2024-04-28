<script lang="ts" setup>

const { signIn, signOut, status, getProviders, data } = useAuth();

</script>

<template>
	<div>
		<h1>Secure Page - Token Details</h1>
		<NuxtLink to="/">Home</NuxtLink> |
		<NuxtLink to="/Todos">ToDo List</NuxtLink>

		<div>
			<pre>{{ status }}</pre>
			<pre>{{ data }}</pre>
			<!-- <pre>{{ cookies }}</pre> -->
		</div>

		<hr />
		<div>
			<button @click="() => signOut()">Sign out</button>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
