import { jsonApi } from "api/todo";
import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { ButtonStyle, FormStyle, InputGroup } from "style/TodoInputStyle";
import { AppDispatch } from "todoRedux/config/configStore";
import { addTodo } from "todoRedux/modules/todosSlice";
import { getTodoFromDB } from "utill/getTodoFromDB";
import { v4 as uuid } from "uuid";

function TodoInput() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeContentHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const onClickSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !content) {
      alert("제목과 내용을 입력해주세요");
      return;
    }

    const newTodo = {
      id: uuid(),
      title,
      content,
      isDone: false,
    };

    try {
      await jsonApi.post("/todos", newTodo);
      dispatch(addTodo(newTodo));
      const todos = await getTodoFromDB();
      return todos;
    } catch (error) {
      console.log(error);
    }

    setTitle("");
    setContent("");
  };

  return (
    <FormStyle onSubmit={onClickSubmit}>
      <InputGroup>
        <label>제목</label>
        <input
          type="text"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={onChangeTitleHandler}
        />
        <label>내용</label>
        <input
          type="text"
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={onChangeContentHandler}
        />
      </InputGroup>
      <ButtonStyle type="submit">추가하기</ButtonStyle>
    </FormStyle>
  );
}

export default TodoInput;
