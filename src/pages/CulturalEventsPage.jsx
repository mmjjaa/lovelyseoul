import styled from "styled-components";
// import SpotList from "../components/SpotList";
import KakaoMap from "../layout/KakaoMap";
import CurrentLocationBtn from "../components/CurrentLocationBtn";
import CulturalEventsBtn from "../components/CulturalEventsBtn";
import CultureList from "../components/CultureList";

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
const CulturalEventsTitle = styled.div`
  font-size: 28px;
  font-weight: bold;
  padding: 0 1rem;
  strong {
    color: #0087ca;
  }
`;
const MCulturalEventsSubtitle = styled.p`
  padding: 0 1rem;
`;
export default function CulturalEventsPage() {
  return (
    <Main>
      <SpotListContainer>
        <CulturalEventsTitle>
          <strong>광화문 광장</strong>은 지금!
        </CulturalEventsTitle>
        <MCulturalEventsSubtitle>
          가장 한산한 시간대를 확인해보세요!
        </MCulturalEventsSubtitle>

        <BtnCon>
          <CurrentLocationBtn />
          <CulturalEventsBtn />
        </BtnCon>

        <CultureList />
        <CultureList />
        <CultureList />
        <CultureList />
        <CultureList />
      </SpotListContainer>
      <KakaoMap />
    </Main>
  );
}
