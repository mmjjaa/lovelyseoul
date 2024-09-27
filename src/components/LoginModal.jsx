import styled from "styled-components";
import { useState } from "react";

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
  border: 1px solid #ccc;
  border-radius: 20px;
  z-index: 10;
`;

const DeleteBtn = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  position: absolute;
  right: 1rem;
  color: #666;
  font-size: 35px;
  cursor: pointer;
`;

const Title = styled.div`
  margin: 3rem;
  h3 {
    font-size: 26px;
  }
  p {
    font-size: 16px;
    color: #666;
  }
`;

const SaveBtn = styled.button`
  border: none;
  outline: none;
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
`;

export default function LoginModal({ onClose, onContinue, setShowLoginModal }) {
  const [isVisible, setIsVisible] = useState(true);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");

  const handleClose = () => {
    setIsVisible(false);
    setShowLoginModal(false);
    onClose();
  };

  const handleSave = (e) => {
    e.preventDefault();
    const nameRegex = /^[가-힣]{2,}$/;
    const ageRegex = /^(?:[1-7]?[0-9]|0)$/;

    if (!nameRegex.test(name)) {
      setError("이름을 올바르게 입력해주세요.");
      return;
    }

    if (!ageRegex.test(age)) {
      setError("나이를 올바르게 입력해주세요.");
      return;
    }

    localStorage.setItem("userInfo", JSON.stringify({ name, age }));
    setError("");
    onContinue();
  };

  return (
    isVisible && (
      <ModalOverlay>
        <LoginCon>
          <DeleteBtn onClick={handleClose}>x</DeleteBtn>
          <Title>
            <h3>로그인</h3>
            <p>간단한 정보를 입력하시면 </p>
            <p> 좋은 정보를 추천해드릴게요!</p>
          </Title>

          <Form onSubmit={handleSave}>
            <input
              name="name"
              type="text"
              placeholder="이름을 입력해주세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              name="age"
              type="text"
              placeholder="나이를 입력해주세요"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <SaveBtn type="submit">Continue</SaveBtn>
          </Form>
        </LoginCon>
      </ModalOverlay>
    )
  );
}
