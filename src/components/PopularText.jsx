import * as S from "../assets/pages.styled/UserMainPage.styled";

export default function PopularText({ age, rate }) {
  return (
    <S.PopularText className="font-weight-regular">
      {age}대 비율이 <strong>{rate}%</strong> 입니다.
    </S.PopularText>
  );
}
