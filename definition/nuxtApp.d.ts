import type TodoService from "~/services/TodoService";

//Services
interface IServices {
    todoService: TodoService
}

declare module "#app" {
    interface NuxtApp {
        $services: IServices;
    }
}