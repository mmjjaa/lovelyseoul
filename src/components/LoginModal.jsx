import styled from "styled-components";
import { useState } from "react";
import useUserStore from "../store/userStore";

const ModalOverlay = styled.div`
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

const LoginCon = styled.div`
  width: 400px;
  height: 400px;
  position: relative;
  text-align: center;
  margin: 1rem;
  background-color: white;
  z-index: 10;
`;

const DeleteBtn = styled.button`
  position: absolute;
  right: 1rem;
  color: #666;
  cursor: pointer;
`;

const Title = styled.div`
  margin: 3rem;
  p {
    color: #666;
  }
`;

const SaveBtn = styled.button`
  background-color: rgba(0, 135, 202, 0.8);
  border-radius: 20px;
  color: white;
  height: 50px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 135, 202, 1);
  }
`;

const Form = styled.form`
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

export default function LoginModal() {
  const { login, closeLoginModal } = useUserStore();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");

  const handleClose = () => {
    closeLoginModal();
  };
  const handleSave = (e) => {
    e.preventDefault();
    const nameRegex = /^[가-힣]{2,}$/;

    if (!nameRegex.test(name)) {
      setError("이름을 올바르게 입력해주세요.");
      return;
    }

    const userInfo = { name, age };
    login(userInfo);
    setError("");
    handleClose();
  };

  return (
    <ModalOverlay>
      <LoginCon className="border-radius-default">
        <DeleteBtn className="font-size-max-extra-large " onClick={handleClose}>
          x
        </DeleteBtn>
        <Title>
          <h3>로그인</h3>
          <p>간단한 정보를 입력하시면 </p>
          <p>좋은 정보를 추천해드릴게요!</p>
        </Title>

        <Form onSubmit={handleSave}>
          <input
            name="name"
            type="text"
            placeholder="이름을 입력해주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          >
            <option value="">나이를 선택해주세요</option>
            <option value="10대">10대</option>
            <option value="20대">20대</option>
            <option value="30대">30대</option>
            <option value="40대">40대</option>
            <option value="50대">50대</option>
            <option value="60대">60대</option>
          </select>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <SaveBtn type="submit">로그인</SaveBtn>
        </Form>
      </LoginCon>
    </ModalOverlay>
  );
}
