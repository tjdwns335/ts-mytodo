import axios from "axios";

const SERVER_URI: string = "http://localhost:4000";

interface Todo {
  id: string;
  title: string;
  content: string;
  isDone: boolean;
}

const getTodos = async (): Promise<Todo[]> => {
  const { data } = await axios.get<Todo[]>(`${SERVER_URI}/todos`);
  return data;
};

const addTodo = async (newTodo: Todo): Promise<void> => {
  await axios.post(`${SERVER_URI}/todos`, newTodo);
};

const removeTodo = async (id: string): Promise<void> => {
  await axios.delete(`${SERVER_URI}/todos/${id}`);
};

const switchTodo = async (payload: {
  id: string;
  isDone: boolean;
}): Promise<void> => {
  await axios.patch(`${SERVER_URI}/todos/${payload.id}`, {
    isDone: payload.isDone,
  });
};

export { getTodos, addTodo, removeTodo, switchTodo };
