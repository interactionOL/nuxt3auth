export function useTodoService() {
	return useNuxtApp().$services.todoService;
}
