<script lang="ts" setup>
import { ApiService } from "../services/TodoService";

const { signIn, signOut, status, getProviders, data } = useAuth();

//import { onMounted, ref } from 'vue';
import type { Todo } from '../definition/todo'
import type { AxiosError } from "axios";

const apiService = new ApiService();
const todos = ref<Todo[]>([]);
const isError = ref<boolean>(false);
const errorMessage = ref<string>('');

async function fetchTodos() {
  try {
    const response = await apiService.get();
    todos.value = response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    const axiosError = error as AxiosError
    isError.value = true;
    errorMessage.value = axiosError?.message
  } 
  
}

onMounted(fetchTodos);

</script>

<template>
	<div>
		<NuxtLink to="/">Home</NuxtLink> |
		<NuxtLink to="/secure">Token Details</NuxtLink>

		
		<div style="margin-top: 20px">
			<button @click="() => signOut({callbackUrl: '/'})">Sign out</button>
		</div>

		<h1>Todo List</h1>
    <ul v-if="todos.length">
      <li v-for="todo in todos" :key="todo.id">
        <span :class="{ completed: todo.isComplete }">{{ todo.name }}</span>
      </li>
    </ul>
    <div v-else-if="isError">
      <p>There was an error downloading the ToDos, check the server</p>
      <p>{{ errorMessage }}</p>
    </div>
    <p v-else>Loading todos...</p>
	</div>
</template>

<style lang="scss" scoped></style>
