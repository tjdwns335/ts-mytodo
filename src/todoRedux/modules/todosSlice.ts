import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jsonApi } from "api/todo";
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

export const __getTodos = createAsyncThunk(
  "getTodos",
  async (payload, thunkAPI) => {
    try {
      const { data } = await jsonApi.get("/todos");
      return data;
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
  },
});

export default todosSlice.reducer;
