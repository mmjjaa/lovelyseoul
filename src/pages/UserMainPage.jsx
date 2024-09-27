import styled from "styled-components";
import SpotList from "../components/SpotList";
import KakaoMap from "../layout/KakaoMap";
import CurrentLocationBtn from "../components/CurrentLocationBtn";
import CulturalEventsBtn from "../components/CulturalEventsBtn";
import { Link } from "react-router-dom";

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
const BtnCon = styled.div`
  display: flex;
  padding: 1rem;
  gap: 1rem;
`;
const UserMainTitle = styled.div`
  padding: 0 1rem;
  font-size: 28px;
  font-weight: bold;
  strong {
    color: #0087ca;
  }
`;
const UserMainSubtitle = styled.p`
  padding: 0 1rem;
`;
export default function UserMain() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const age = parseInt(userInfo.age, 10);
  const ageGroup = Math.floor(age / 10) * 10;

  const userAgeGroup = age < 10 ? "0대" : `${ageGroup}`;

  return (
    <Main>
      <SpotListContainer>
        <UserMainTitle>
          {userInfo.name}님! 현재 {userAgeGroup}대에게
          <strong> 인기가 많은 </strong>
          곳이에요!
        </UserMainTitle>
        <UserMainSubtitle>
          저희가 한눈에 보실 수 있도록 모아봤어요!
        </UserMainSubtitle>

        <BtnCon>
          <Link>
            <CurrentLocationBtn />
          </Link>

          <Link to="/culturaleventspage">
            <CulturalEventsBtn />
          </Link>
        </BtnCon>

        <SpotList />
        <SpotList />
        <SpotList />
        <SpotList />
        <SpotList />
      </SpotListContainer>
      <KakaoMap />
    </Main>
  );
}
