<script lang="ts" setup>
import { ApiService } from "../services/TodoService";


const { signIn, signOut, status, getProviders, data } = useAuth();

//import { onMounted, ref } from 'vue';
import type { Todo } from '../definition/todo'

const apiService = new ApiService();
const todos = ref<Todo[]>([]);

async function fetchTodos() {
  try {
    const response = await apiService.get();
    todos.value = response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
  }
}

onMounted(fetchTodos);

</script>

<template>
	<div>
		<h1>Secure PAGE 2</h1>
		<NuxtLink to="/">Home</NuxtLink>

		<div>
			<pre>{{ status }}</pre>
			<pre>{{ data }}</pre>
			<!-- <pre>{{ cookies }}</pre> -->
		</div>

		<hr />
		<div>
			<button @click="() => signOut()">Sign out</button>
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
~/definition/todo