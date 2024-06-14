export interface Todo {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface TodoState {
  isLoading: boolean;
  todos: Todo[];
}

export interface RootState {
  todo: TodoState;
}
