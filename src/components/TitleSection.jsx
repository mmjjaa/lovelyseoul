import { Link } from "react-router-dom";
import * as S from "../assets/pages.styled/UserMainPage.styled";
import CurrentLocationBtn from "./MainPageBtn/CurrentLocationBtn";
import CulturalEventsBtn from "./MainPageBtn/CulturalEventsBtn";
export default function TitleSection({
  isOpen,
  spotName,
  postposition,
  userInfo,
}) {
  if (isOpen) {
    return (
      <>
        <S.UserMainTitle>
          <strong>{spotName}</strong>
          {postposition} 지금!
        </S.UserMainTitle>
        <S.UserMainSubtitle>
          가장 한산한 시간대를 확인해보세요!
        </S.UserMainSubtitle>
        <S.BtnCon>
          <Link>
            <CurrentLocationBtn />
          </Link>
          <Link to="/culturaleventspage">
            <CulturalEventsBtn />
          </Link>
        </S.BtnCon>
      </>
    );
  }

  if (userInfo) {
    return (
      <>
        <S.UserMainTitle>
          {userInfo.name}님! 현재 {userInfo.age}대에게
          <strong> 인기가 많은 </strong>
          곳이에요!
        </S.UserMainTitle>
        <S.UserMainSubtitle>
          저희가 한눈에 보실 수 있도록 모아봤어요!
        </S.UserMainSubtitle>
      </>
    );
  }

  return (
    <>
      <S.UserMainTitle>
        현재 가장
        <strong> 인기가 많은 </strong>
        곳이에요!
      </S.UserMainTitle>
      <S.UserMainSubtitle>
        저희가 한눈에 보실 수 있도록 모아봤어요!
      </S.UserMainSubtitle>
    </>
  );
}
