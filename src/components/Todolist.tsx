import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  __deleteTodo,
  __getTodos,
  __switchTodo,
} from "todoRedux/modules/todosSlice";
import { RootState } from "todoRedux/config/configStore";
import {
  ButtonGroup,
  DeleteButton,
  SwitchButton,
  TodoContents,
  TodoListWrap,
  TodoTitleStyle,
} from "style/TodoListStyle";

interface TodoListProps {
  isActive: boolean;
}

const Todolist: React.FC<TodoListProps> = ({ isActive }) => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.todos.todos);

  useEffect(() => {
    dispatch(__getTodos() as any);
  }, [dispatch]);

  const onClickSwitchHandler = (id: string, isDone: boolean) => {
    dispatch(__switchTodo({ id, isDone }) as any);
  };
  const onClickRemoveHandler = (id: string) => {
    const deleteConfirm = window.confirm("삭제하시겠습니까?");
    if (deleteConfirm) {
      dispatch(__deleteTodo(id) as any);
    }
  };
  return (
    <>
      <div>
        <TodoTitleStyle>
          {isActive ? "해야 할 일🔥 " : "완료한 일 ☑️"}
        </TodoTitleStyle>
      </div>
      <TodoListWrap>
        {data
          ?.filter((item) => item.isDone === !isActive)
          .map((item) => {
            return (
              <TodoContents key={item.id}>
                <h2>{item.title}</h2>
                <p>{item.content}</p>
                <ButtonGroup>
                  <DeleteButton onClick={() => onClickRemoveHandler(item.id)}>
                    삭제
                  </DeleteButton>
                  <SwitchButton
                    isActive={isActive}
                    onClick={() => onClickSwitchHandler(item.id, item.isDone)}
                  >
                    {isActive ? "완료" : "취소"}
                  </SwitchButton>
                </ButtonGroup>
              </TodoContents>
            );
          })}
      </TodoListWrap>
    </>
  );
};

export default Todolist;
