import Header from "components/Header";
import TodoInput from "components/TodoInput";
import Todolist from "components/Todolist";
import styled from "styled-components";

function Todo() {
  return (
    <Wrap>
      <Header />
      <TodoInput />
      <Todolist isActive={true} />
      <Todolist isActive={false} />
    </Wrap>
  );
}

export default Todo;

const Wrap = styled.div`
  width: 1200px;
  height: auto;
  margin: auto;
`;
