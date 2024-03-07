import styled, { css } from "styled-components";

export const TodoTitleStyle = styled.div`
  font-size: 30px;
  font-weight: 700;
  margin: 30px 0 20px 2px;
`;

export const TodoListWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const TodoContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  border: 3px solid #00c37d;
  padding: 25px;
  margin-right: 30px;
  margin-bottom: 20px;
  border-radius: 10px;
  width: 200px;
  & h2 {
    font-size: 25px;
    font-weight: 700;
  }
  & p {
    font-size: 20px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  justify-content: space-between;
  align-items: center;
`;

export const DeleteButton = styled.div`
  border: 2px solid #e60023;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #e60023;
    color: #fff;
  }
`;

interface SwitchButtonProps {
  isActive: boolean;
}

export const SwitchButton = styled.button<SwitchButtonProps>`
  border: 2px solid;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: #fff;
  cursor: pointer;
  border-color: ${({ isActive }) => (isActive ? "#00c37d" : "#2593f3")};

  ${({ isActive }) => {
    if (isActive) {
      return css`
        &:hover {
          background-color: #00c37d;
          color: #fff;
        }
      `;
    } else {
      return css`
        &:hover {
          background-color: #2593f3;
          color: #fff;
        }
      `;
    }
  }}
`;
