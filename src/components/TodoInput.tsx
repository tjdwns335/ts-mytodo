import React, { ChangeEvent, useState } from "react";
import { ButtonStyle, FormStyle, InputGroup } from "style/TodoInputStyle";
import { v4 as uuid } from "uuid";

function TodoInput() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeContentHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const onClickSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
