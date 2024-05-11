<script lang="ts" setup>
//const { signIn, signOut, status, getProviders, data } = useAuth();

import type { Todo } from "../definition/todo";

const { todoService } = useNuxtApp().$services;
import type { AxiosError } from "axios";

const isError = ref<boolean>(false);
const errorMessage = ref<string>("");

function loadTodos() {
  
}

const { data: todos } = await useAsyncData<Todo[]>(
  "todos",
  async () => {
    try {
      const response = await todoService.get();
      console.log("Response is ", response)
      return response.data;
    } catch (error) {
      console.error("Error fetching todos:", error);
      const axiosError = error as AxiosError;
      isError.value = true;
      errorMessage.value = axiosError?.message;
      //return []
    }
  },
  {
    default: () => [],
  }
);
</script>

<template>
  <div>
    <NuxtLink to="/">Home</NuxtLink> |
    <NuxtLink to="/secure">Token Details</NuxtLink>

    <div style="margin-top: 20px">
      <!-- <button @click="() => signOut({ callbackUrl: '/' })">Sign out</button> -->
    </div>

    <h1>Todo List</h1>
    <div v-if="isError">
      <p>There was an error downloading the ToDos, check the server</p>
      <p>{{ errorMessage }}</p>
    </div>
    <ul v-else-if="todos?.length">
      <li v-for="todo in todos" :key="todo.id">
        <span :class="{ completed: todo.isComplete }">{{ todo.name }}</span>
      </li>
    </ul>
    <p v-else>Loading todos... <a href="#" @click="loadTodos">reload</a></p>
  </div>
</template>

<style lang="scss" scoped></style>
