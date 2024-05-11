import { defineNuxtPlugin } from '#app';
import TodoService from '@/services/TodoService';
import axios from 'axios';
import type { IServices } from '~/definition/nuxtApp';

export default defineNuxtPlugin(nuxtApp => {
	const api = axios.create({
		baseURL: 'https://localhost:7244/api/', // Replace with your API's base URL
	});

	// Adding an interceptor to attach the token
	const { user, refresh } = useOidcAuth()
	// Adding an interceptor to attach the token
	api.interceptors.request.use(async config => {
	
		if (user.value.expireAt < Date.now() / 1000 - 10000)
		{
			await refresh();
		}
      // Retrieve your token from wherever it's stored
      const token = user.value?.accessToken;
		console.info("appending token to query ", token);
		config.headers.Authorization = `Bearer ${token}`;

		return config;
	},
	error => {
		return Promise.reject(error);
	});

	// Initialising the TodoService and passing the api instance
	const todoService = new TodoService(api);

	const services : IServices = {
		todoService
	}

	// Providing the TodoService available to the app
	return {
    provide: {
      services: services,
    },
  };
});
