import styled from "styled-components";

export const FormStyle = styled.form`
  display: flex;
  align-items: center;
  gap: 20px;
  height: 90px;
  padding: 30px;
  background-color: #f2f2f2;
  margin-bottom: 50px;
  justify-content: space-between;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  & label {
    display: inline-block;
    font-size: 18px;
    font-weight: 700;
    margin: 0 20px;
    width: 20%;
  }
  & input {
    width: 80%;
    padding: 5px 10px;
    border-radius: 10px;
  }
`;

export const ButtonStyle = styled.button`
  padding: 10px 20px;
  background-color: #00c37d;
  border: none;
  cursor: pointer;
  border-radius: 20px;

  &:hover {
    background-color: #e85657;
  }
`;
