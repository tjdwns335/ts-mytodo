import { jsonApi } from "api/todo";
import { Todo } from "todoRedux/modules/todosSlice";

export const getTodoFromDB = async () => {
  const { data } = await jsonApi.get("/todos");
  return data as Todo[];
};
