<script lang="ts" setup>
const { signIn, signOut, status, getProviders, data } = useAuth();

//import { onMounted, ref } from 'vue';
import type { Todo } from './../definition/todo';

// Accessing service through nuxt instance
const apiService = useNuxtApp().$todoService;

// Or we can create a composable for simplicity (look at @/composables/api-services.ts)
// const apiService = useTodoService();

// Network calls duplication (incorrect way to fetch data on nuxt)
// https://nuxt.com/docs/getting-started/data-fetching
// const todos = ref<Todo[]>([]);

// async function fetchTodos() {
// 	try {
// 		const response = await apiService.get();
// 		todos.value = response.data;
// 	} catch (error) {
// 		console.error('Error fetching todos:', error);
// 	}
// }

// onMounted(fetchTodos);

// We should use a composable called useAsyncData instead
const { data: todos } = await useAsyncData<Todo[]>(
	'todos',
	async () => {
		try {
			const response = await apiService.get();
			return response.data;
		} catch (error) {
			console.error('Error fetching todos:', error);
		}
	},
	{
		default: () => [],
	}
);
</script>

<template>
	<div>
		<h1>Secure</h1>
		<NuxtLink to="/">Home</NuxtLink>

		<div>
			<pre>{{ status }}</pre>
			<pre>{{ data }}</pre>
			<!-- <pre>{{ cookies }}</pre> -->
		</div>

		<hr />
		<div>
			<button @click="() => signOut({ callbackUrl: '/' })">Sign out</button>
		</div>

		<h1>Todo List</h1>
		<ul v-if="todos.length">
			<li v-for="todo in todos" :key="todo.id">
				<span :class="{ completed: todo.isComplete }">{{ todo.name }}</span>
			</li>
		</ul>
		<p v-else>Loading todos...</p>
	</div>
</template>

<style lang="scss" scoped></style>
