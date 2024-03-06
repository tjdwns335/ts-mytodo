import { getTodos, removeTodo, switchTodo } from "api/todo";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

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
    console.log(id, isDone);
  };
  const onClickRemoveHandler = (id: string) => {
    removeMutation.mutate(id);
  };
  return (
    <>
      <div>
        <h1>{isActive ? "해야 할 일 " : "완료한 일 ☑️"}</h1>
      </div>
      <div>
        {data
          ?.filter((item) => item.isDone === !isActive)
          .map((item) => {
            return (
              <div key={item.id}>
                <h2>{item.title}</h2>
                <p>{item.content}</p>
                <div>
                  <button
                    onClick={() => onClickSwitchHandler(item.id, item.isDone)}
                  >
                    {isActive ? "완료" : "취소"}
                  </button>
                  <button onClick={() => onClickRemoveHandler(item.id)}>
                    삭제
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Todolist;
