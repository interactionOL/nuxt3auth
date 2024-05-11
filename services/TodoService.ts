import type { Axios } from 'axios';

interface ApiOptions {
  params?: Record<string, any>;
  data?: any;
}

export default class TodoService {
  constructor(private readonly axios: Axios) {}

  get(options: ApiOptions = {}) {
    return this.axios.get("/ToDoItems", { params: options.params });
  }

  getById(itemId: number, options: ApiOptions = {}) {
    return this.axios.get("/ToDoItems/" + itemId, { params: options.params });
  }

  post(url: string, options: ApiOptions = {}) {
    return this.axios.post(url, options.data);
  }

  put(url: string, options: ApiOptions = {}) {
    return this.axios.put(url, options.data);
  }

  delete(url: string, options: ApiOptions = {}) {
    return this.axios.delete(url, { params: options.params });
  }
}
