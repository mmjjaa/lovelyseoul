import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const LoginCon = styled.div`
  width: 400px;
  height: 400px;
  position: relative;
  text-align: center;
  margin: 1rem;
  background-color: white;
  z-index: 10;
`;

export const DeleteBtn = styled.button`
  position: absolute;
  right: 1rem;
  color: #666;
`;

export const Title = styled.div`
  margin: 3rem;
  p {
    color: #666;
  }
`;

export const SaveBtn = styled.button`
  background-color: rgba(0, 135, 202, 0.8);
  color: white;
  height: 50px;
  &:hover {
    background-color: rgba(0, 135, 202, 1);
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 1rem;
  input {
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  select {
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`;
