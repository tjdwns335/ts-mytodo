import { getTodos, removeTodo, switchTodo } from "api/todo";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
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
  const { data } = useQuery("todos", getTodos);

  const queryClient = useQueryClient();

  // TODO: removeTodo
  const removeMutation = useMutation(removeTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
  // TODO: switchTodo
  const switchMutation = useMutation(switchTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const onClickSwitchHandler = (id: string, isDone: boolean) => {
    const payload = {
      id,
      isDone: !isDone,
    };
    switchMutation.mutate(payload);
  };
  const onClickRemoveHandler = (id: string) => {
    const deleteConfirm = window.confirm("삭제하시겠습니까?");
    if (deleteConfirm) {
      removeMutation.mutate(id);
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
