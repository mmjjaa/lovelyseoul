import { useState } from "react";
import useUserStore from "../store/userStore";
import * as S from "../assets/components.styled/LoginModal.styled";

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
    <S.ModalOverlay>
      <S.LoginCon className="border-radius-default">
        <S.DeleteBtn
          className="font-size-max-extra-large "
          onClick={handleClose}
        >
          x
        </S.DeleteBtn>
        <S.Title>
          <h3>👋</h3>
          <h3>이름/연령대를 알려주세요!</h3>
          <p>간단한 정보를 입력하시면 </p>
          <p>좋은 정보를 추천해드릴게요!</p>
        </S.Title>

        <S.Form onSubmit={handleSave}>
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
            <option value="10">10대</option>
            <option value="20">20대</option>
            <option value="30">30대</option>
            <option value="40">40대</option>
            <option value="50">50대</option>
            <option value="60">60대</option>
          </select>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <S.SaveBtn className="border-radius-default" type="submit">
            로그인
          </S.SaveBtn>
        </S.Form>
      </S.LoginCon>
    </S.ModalOverlay>
  );
}
