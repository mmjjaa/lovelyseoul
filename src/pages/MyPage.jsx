import styled from "styled-components";
import SpotList from "../components/SpotList";
import KakaoMap from "../layout/KakaoMap";
import useUserStore from "../store/userStore";

const Main = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const SpotListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  max-width: 40%;
  overflow-y: auto;
`;
const MypageTitle = styled.h2`
  padding: 0 1rem;
`;
const MypageSubtitle = styled.p`
  padding: 0 1rem;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding-top: 200px;
  h2 {
    color: #999;
  }
  strong {
    color: #eb5050;
  }
`;
export default function MyPage() {
  const { userInfo, favoriteSpots } = useUserStore();

  return (
    <Main>
      <SpotListContainer>
        <MypageTitle>
          <strong>{userInfo?.name}님이 </strong>
          찜한 목록이에요!
        </MypageTitle>
        <MypageSubtitle>
          저희가 한눈에 보실 수 있도록 모아봤어요!
        </MypageSubtitle>
        {favoriteSpots.length === 0 ? (
          <EmptyMessage>
            <img src="/img/EmptyMypage.svg" alt="" />
            <h2>찜한 목록이 비어있어요. </h2>
            <p>
              좋아하는 장소에 <strong>♥</strong> 를 눌러주세요.
            </p>
          </EmptyMessage>
        ) : (
          favoriteSpots.map((spot) => (
            <SpotList key={spot.AREA_NM} place={spot} />
          ))
        )}
      </SpotListContainer>
      <KakaoMap />
    </Main>
  );
}
