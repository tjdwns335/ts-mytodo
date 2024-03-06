import { getTodos } from "api/todo";
import Header from "components/Header";
import TodoInput from "components/TodoInput";
import Todolist from "components/Todolist";

function Todo() {
  return (
    <>
      <Header />
      <TodoInput />
      <Todolist isActive={true} />
      <Todolist isActive={false} />
    </>
  );
}

export default Todo;
