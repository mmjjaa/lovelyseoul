import styled from "styled-components";
import { useState, useEffect } from "react";
import SpotList from "../components/SpotList";
import LoginModal from "../components/LoginModal";
import KakaoMap from "../layout/KakaoMap";
import CurrentLocationBtn from "../components/CurrentLocationBtn";
import CulturalEventsBtn from "../components/CulturalEventsBtn";
import { Link } from "react-router-dom";
import UseGetPeopleData from "../hooks/useGetPeopleData";

const Main = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  position: relative;
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
const NoUserMainTitle = styled.div`
  padding: 0 1rem;
  font-size: 28px;
  font-weight: bold;
  font-family: NanumGothic;
  strong {
    color: #0087ca;
  }
`;
const NoUserMainSubtitle = styled.p`
  padding: 0 1rem;
`;

export default function NoUserMainPage({ onMyPageClick }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { placesData, isLoading } = UseGetPeopleData();
  const [hotPlaces, setHotPlaces] = useState([]);

  // 인구 많은 핫플 가져오기
  useEffect(() => {
    if (!isLoading) {
      console.log("placesData-------:", placesData);

      placesData.forEach((place, index) => {
        console.log(`Place ${index}:`, place[0].AREA_CONGEST_LVL);
      });

      const filteredhotPlaces = placesData.filter(
        (place) => place[0].AREA_CONGEST_LVL === "붐빔"
      );
      setHotPlaces(filteredhotPlaces);
      console.log("Busy Places--------:", filteredhotPlaces);
    }
  }, [isLoading, placesData]);

  return (
    <>
      <Main>
        <SpotListContainer>
          <NoUserMainTitle>
            현재 가장
            <strong> 인기가 많은 </strong>
            곳이에요!
          </NoUserMainTitle>
          <NoUserMainSubtitle>
            저희가 한눈에 보실 수 있도록 모아봤어요!
          </NoUserMainSubtitle>

          <BtnCon>
            <Link>
              <CurrentLocationBtn />
            </Link>
            <Link to="/culturaleventspage">
              <CulturalEventsBtn />
            </Link>
          </BtnCon>

          {hotPlaces.map((place, index) => (
            <SpotList
              key={index}
              setShowLoginModal={setShowLoginModal}
              place={place[0]}
              hotPlaces={hotPlaces}
            />
          ))}
        </SpotListContainer>
        <KakaoMap />
        {showLoginModal && <LoginModal setShowLoginModal={setShowLoginModal} />}
      </Main>
    </>
  );
}
