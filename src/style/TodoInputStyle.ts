import styled from "styled-components";

export const FormStyle = styled.form`
  width: 50%;
  background-color: #e2e2e2;
  padding: 15px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const InputGroup = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  & label {
    font-size: 18px;
  }
  & input {
    width: 50%;
    padding: 5px 10px;
  }
`;

export const ButtonStyle = styled.button`
  padding: 10px 20px;
`;
