import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import SpotList from "../components/SpotList";
import LoginModal from "../components/LoginModal";
import KakaoMap from "../layout/KakaoMap";
import CurrentLocationBtn from "../components/CurrentLocationBtn";
import CulturalEventsBtn from "../components/CulturalEventsBtn";
import { Link } from "react-router-dom";
import UseFetchPeopleData from "../hooks/useFetchPeopleData";
import useSpotListStore from "../store/spotListStore";
import usePlaceMarkerStore from "../store/clickPlaceMarkerStore";
import { checkKorean } from "../utils/checkKorean";
import BounceLoader from "react-spinners/BounceLoader";
import useUserStore from "../store/userStore";

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
  margin: 1rem;
  overflow-y: auto;
`;
const TitleContainer = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10;
  padding: 1rem;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
`;

const BtnCon = styled.div`
  display: flex;
  padding: 1rem;
  gap: 1rem;
`;
const NoUserMainText = styled.div`
  padding: 0 1rem;
`;
const NoUserMainTitle = styled(NoUserMainText).attrs({ as: "h2" })``;
const NoUserMainSubtitle = styled(NoUserMainText).attrs({ as: "p" })``;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default function NoUserMainPage() {
  const { showLoginModal, openLoginModal, closeLoginModal } = useUserStore();
  const { placesData, isLoading } = UseFetchPeopleData();
  const [hotPlaces, setHotPlaces] = useState([]);
  const { clickedMarkerName } = usePlaceMarkerStore();
  const { accordionStates, setAccordionState } = useSpotListStore();
  const openSpotNames = Object.keys(accordionStates).filter(
    (key) => accordionStates[key]
  );
  const spotName = openSpotNames[0];
  const isOpen = openSpotNames.length > 0;
  const postposition = checkKorean(spotName);

  const selectedPlace = placesData.find(
    (place) => place[0]?.AREA_NM === clickedMarkerName
  );
  const spotListContainerRef = useRef(null);

  /* 인기 많은 곳 가져오기 */
  useEffect(() => {
    if (!isLoading && placesData.length) {
      const top10Places = placesData
        .sort((a, b) => b[0].AREA_PPLTN_MAX - a[0].AREA_PPLTN_MAX)
        .slice(0, 10);
      setHotPlaces(top10Places);
    }
  }, [isLoading, placesData]);

  /* 선택된 마커와 일치하는 장소 찾기*/
  useEffect(() => {
    if (clickedMarkerName && selectedPlace) {
      setAccordionState(clickedMarkerName, true);
      Object.keys(accordionStates).forEach((key) => {
        if (key !== clickedMarkerName) {
          setAccordionState(key, false);
        }
      });
    }
  }, [clickedMarkerName, placesData, setAccordionState, selectedPlace]);

  /*선택된 장소 있을 때 첫 번째 리스트로 스크롤*/
  useEffect(() => {
    if (spotListContainerRef.current && hotPlaces.length > 0) {
      spotListContainerRef.current.scrollTop = 0;
      if (selectedPlace && selectedPlace.length > 0) {
        setAccordionState(selectedPlace[0].AREA_NM, true);
      }
    }
  }, [selectedPlace, hotPlaces, setAccordionState]);
  return (
    <Main>
      <SpotListContainer ref={spotListContainerRef}>
        {isLoading ? (
          <LoaderContainer>
            <BounceLoader color="#0087CA" loading={isLoading} size={60} />
          </LoaderContainer>
        ) : (
          <>
            <TitleContainer>
              {isOpen ? (
                <>
                  <NoUserMainTitle>
                    <strong>{spotName}</strong>
                    {postposition} 지금!
                  </NoUserMainTitle>
                  <NoUserMainSubtitle>
                    가장 한산한 시간대를 확인해보세요!
                  </NoUserMainSubtitle>
                  <BtnCon>
                    <Link>
                      <CurrentLocationBtn />
                    </Link>
                    <Link to="/culturaleventspage">
                      <CulturalEventsBtn />
                    </Link>
                  </BtnCon>
                </>
              ) : (
                <>
                  <NoUserMainTitle>
                    현재 가장
                    <strong> 인기가 많은 </strong>
                    곳이에요!
                  </NoUserMainTitle>
                  <NoUserMainSubtitle>
                    저희가 한눈에 보실 수 있도록 모아봤어요!
                  </NoUserMainSubtitle>
                </>
              )}
            </TitleContainer>
            {selectedPlace && selectedPlace[0] && (
              <SpotList
                setShowLoginModal={openLoginModal}
                place={selectedPlace[0]}
                hotPlaces={hotPlaces}
                isOpen={true}
                setAccordionState={setAccordionState}
              />
            )}
            {hotPlaces.map((place, index) => (
              <SpotList
                key={index}
                setShowLoginModal={openLoginModal}
                place={place[0]}
                hotPlaces={hotPlaces}
                isOpen={false}
                setAccordionState={setAccordionState}
              />
            ))}
          </>
        )}
      </SpotListContainer>

      <KakaoMap setHotPlaces={setHotPlaces} />

      {showLoginModal && <LoginModal setShowLoginModal={closeLoginModal} />}
    </Main>
  );
}
