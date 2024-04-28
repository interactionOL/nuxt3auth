<script setup>
	definePageMeta({ auth: false })
</script>

<template>
	<div>
		<h1>Homepage</h1>
		<NuxtLink to="/todos">ToDo List</NuxtLink> | 
		<NuxtLink to="/secure">Token Information</NuxtLink>
	</div>
</template>

<style lang="scss" scoped></style>
