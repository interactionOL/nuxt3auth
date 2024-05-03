<script setup>
const { loggedIn, user, login, logout } = useOidcAuth();
definePageMeta({auth:false})
</script>

<template>
	<div>
		<h1>Homepage</h1>
		<NuxtLink to="/todos">ToDo List</NuxtLink> | 
		<NuxtLink to="/secure">Token Information</NuxtLink>

		<div v-if="loggedIn">
    <h1>Welcome {{ user.userName }}!</h1>
    <p>Logged in since {{ user.loggedInAt }}</p>
    <button @click="logout()">Logout</button>
  </div>
  <div v-else>
    <h1>Not logged in</h1>
    <a href="/auth/github/login">Login with GitHub</a>
    <button @click="login()">Login with default provider</button>
  </div>

	</div>
</template>

<style lang="scss" scoped></style>
