import SpotList from "../components/SpotList";
import KakaoMap from "../layout/KakaoMap";
import useUserStore from "../store/userStore";
import * as S from "../assets/pages.styled/MyPage.styled";

export default function MyPage() {
  const { userInfo, favoriteSpots } = useUserStore();
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <S.Main>
      <S.SpotListContainer>
        <S.TitleContainer>
          <S.MypageTitle>
            <strong>{userInfo?.name}님이 </strong>
            찜한 목록이에요!
          </S.MypageTitle>
          <S.button onClick={handleGoBack}>메인으로</S.button>
        </S.TitleContainer>
        <S.MypageSubtitle>
          저희가 한눈에 보실 수 있도록 모아봤어요!
        </S.MypageSubtitle>
        {favoriteSpots.length === 0 ? (
          <S.EmptyMessage>
            <img src="/img/EmptyMypage.svg" alt="" />
            <h2>찜한 목록이 비어있어요. </h2>
            <p>
              좋아하는 장소에 <strong>♥</strong> 를 눌러주세요.
            </p>
          </S.EmptyMessage>
        ) : (
          favoriteSpots.map((spot) => (
            <SpotList key={spot.AREA_NM} place={spot} />
          ))
        )}
      </S.SpotListContainer>
      <KakaoMap />
    </S.Main>
  );
}
