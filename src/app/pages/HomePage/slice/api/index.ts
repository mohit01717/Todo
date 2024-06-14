import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

interface Todo {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const api = {
  fetchTodos: async (): Promise<Todo[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },
  addTodo: async (todo: Todo): Promise<Todo> => {
    const response = await axios.post(API_URL, todo);
    return response.data;
  },
  deleteTodo: async (id: number): Promise<number> => {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  },
  editTodo: async (todo: Todo): Promise<Todo> => {
    const response = await axios.put(`${API_URL}/${todo.id}`, todo);
    return response.data;
  },
};
