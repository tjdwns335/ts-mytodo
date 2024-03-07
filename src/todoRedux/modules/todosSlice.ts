import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { getTodoFromDB } from "utill/getTodoFromDB";

export interface Todo {
  id: string;
  title: string;
  content: string;
  isDone: boolean;
}

type initialState = {
  todos: Todo[];
  isLoading: boolean;
  isError: boolean;
  error: any;
};

const initialState: initialState = {
  todos: [],
  isLoading: false,
  isError: false,
  error: null,
};

type TodoAsyncThunk = AsyncThunk<Todo[], void, AsyncThunkConfig>;

export const __getTodos: TodoAsyncThunk = createAsyncThunk(
  "getTodos",
  async (_, thunkAPI) => {
    try {
      const todos = await getTodoFromDB();
      return todos;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(__getTodos.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(__getTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.todos = action.payload;
    });
    builder.addCase(__getTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
  },
});

export const { addTodo, deleteTodo, switchTodo } = todosSlice.actions;
export default todosSlice.reducer;
