import styled from "styled-components";
import SpotList from "../components/SpotList";
import KakaoMap from "../layout/KakaoMap";

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
const MypageTitle = styled.div`
  padding: 0 1rem;
  font-size: 28px;
  font-weight: bold;
  strong {
    color: #0087ca;
  }
`;
const MypageSubtitle = styled.p`
  padding: 0 1rem;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding-top: 200px;
  h2 {
    color: #999;
    font-size: 28px;
    font-weight: 900;
  }
  p {
    font-family: "Noto Sans KR", sans-serif;
    font-size: 16px;
    font-weight: 300;
  }
`;
export default function MyPage() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const favoriteSpots = JSON.parse(localStorage.getItem("favoriteSpots"));

  return (
    <Main>
      <SpotListContainer>
        <MypageTitle>
          <strong>{userInfo.name}님이 </strong>
          찜한 목록이에요!
        </MypageTitle>
        <MypageSubtitle>
          저희가 한눈에 보실 수 있도록 모아봤어요!
        </MypageSubtitle>
        {favoriteSpots.length === 0 ? (
          <EmptyMessage>
            <img src="/img/EmptyMypage.svg" alt="" />
            <h2>찜한 목록이 비어있어요. </h2>
            <p>좋아하는 장소에 ♥를 눌러주세요.</p>
          </EmptyMessage>
        ) : (
          <>
            {favoriteSpots.map((spot, index) => (
              <SpotList key={index} spot={spot} isFavorited={true} />
            ))}
          </>
        )}
      </SpotListContainer>
      <KakaoMap />
    </Main>
  );
}
