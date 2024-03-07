import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "todoRedux/config/configStore";
import { jsonApi } from "api/todo";
import { getTodoFromDB } from "utill/getTodoFromDB";
import {
  ButtonGroup,
  DeleteButton,
  SwitchButton,
  TodoContents,
  TodoListWrap,
  TodoTitleStyle,
} from "style/TodoListStyle";
import {
  __getTodos,
  deleteTodo,
  switchTodo,
} from "todoRedux/modules/todosSlice";

interface TodoListProps {
  isActive: boolean;
}

const Todolist: React.FC<TodoListProps> = ({ isActive }) => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos.todos);

  useEffect(() => {
    dispatch(__getTodos());
  }, [dispatch]);

  const onClickSwitchHandler = async (id: string, isDone: boolean) => {
    try {
      await jsonApi.patch(`/todos/${id}`, { isDone: !isDone });
      dispatch(switchTodo(id));
      const todos = await getTodoFromDB();
      return todos;
    } catch (error) {
      console.log(error);
    }
  };
  const onClickRemoveHandler = async (id: string) => {
    const deleteConfirm = window.confirm("삭제하시겠습니까?");
    if (deleteConfirm) {
      try {
        await jsonApi.delete(`/todos/${id}`);
        dispatch(deleteTodo(id));
        const todos = await getTodoFromDB();
        return todos;
      } catch (error) {
        console.log(error);
      }
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
        {todos
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
