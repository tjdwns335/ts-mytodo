import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { jsonApi } from "api/todo";
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
export type TodoAsyncThunk = AsyncThunk<Todo[], void, AsyncThunkConfig>;

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

export const __addTodo = createAsyncThunk(
  "addTodo",
  async (newTodo: Todo, thunkAPI) => {
    try {
      await jsonApi.post("/todos", newTodo);
      const todos = await getTodoFromDB();
      return todos;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteTodo = createAsyncThunk(
  "deleteTodo",
  async (id: string, thunkAPI) => {
    try {
      await jsonApi.delete(`/todos/${id}`);
      const todos = await getTodoFromDB();
      return todos;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __switchTodo = createAsyncThunk(
  "switchTodo",
  async ({ id, isDone }: { id: string; isDone: boolean }, thunkAPI) => {
    try {
      await jsonApi.patch(`/todos/${id}`, { isDone: !isDone });
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
  reducers: {},
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
    builder.addCase(__addTodo.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(__addTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.todos = action.payload;
    });
    builder.addCase(__addTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
    builder.addCase(__deleteTodo.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(__deleteTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.todos = action.payload;
    });
    builder.addCase(__deleteTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
    builder.addCase(__switchTodo.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(__switchTodo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.todos = action.payload;
    });
    builder.addCase(__switchTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
  },
});

export default todosSlice.reducer;
