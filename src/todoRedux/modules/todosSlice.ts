import { createSlice } from "@reduxjs/toolkit";

export interface Todo {
  id: string;
  title: string;
  content: string;
  isDone: boolean;
}

const initialState = {
  todos: [
    {
      id: "fea31",
      title: "test",
      content: "테스트해보자",
      isDone: false,
    },
    {
      id: "fea33",
      title: "test",
      content: "테스트해봤다",
      isDone: true,
    },
  ],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = action.payload;
      return { ...state, todos: [...state.todos, newTodo] };
    },
    deleteTodo: (state, action): void => {
      const id = action.payload;
      state.todos = state.todos.filter((item) => item.id !== id);
    },
    switchTodo: (state, action): void => {
      const id = action.payload;
      state.todos.map((item) => {
        if (item.id === id) {
          item.isDone = !item.isDone;
        }
      });
    },
  },
});

export const { addTodo, deleteTodo, switchTodo } = todosSlice.actions;
export default todosSlice.reducer;
