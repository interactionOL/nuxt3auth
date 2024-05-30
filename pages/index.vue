<script setup>
const { loggedIn, user, login, logout } = useOidcAuth();
definePageMeta({ auth: false })


import { useRouter } from 'vue-router'

const router = useRouter();
const routes = router.getRoutes();

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
<ul>
    <li v-for="route in routes" :key="route.path">{{ route.path }}</li>
  </ul>


	</div>
</template>

<style lang="scss" scoped></style>
