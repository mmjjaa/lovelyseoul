import styled from "styled-components";
import SpotList from "../components/SpotList";
import KakaoMap from "../layout/KakaoMap";
import CurrentLocationBtn from "../components/CurrentLocationBtn";
import CulturalEventsBtn from "../components/CulturalEventsBtn";
import { Link } from "react-router-dom";
import useUserStore from "../store/userStore";
import UseFetchPeopleData from "../hooks/useFetchPeopleData";
import { useState, useEffect } from "react";
import useSpotListStore from "../store/spotListStore";
import usePlaceMarkerStore from "../store/clickPlaceMarkerStore";
import BounceLoader from "react-spinners/BounceLoader";
import { checkKorean } from "../utils/checkKorean";

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
const UserMainTitle = styled.h2`
  padding: 0 1rem;
`;
const UserMainSubtitle = styled.p`
  padding: 0 1rem;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default function UserMain() {
  const { userInfo } = useUserStore();
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

  /* 인기 많은 곳 가져오기 */
  useEffect(() => {
    if (!isLoading) {
      console.log("placesData-------:", placesData);

      /* 로그인된 유저 나이대 비율 상위 10개 */
      const top10Places = placesData
        .sort(
          (a, b) =>
            b[0][`PPLTN_RATE_${userInfo.age}`] -
            a[0][`PPLTN_RATE_${userInfo.age}`]
        )
        .slice(0, 10);

      setHotPlaces(top10Places);
    }
  }, [isLoading, placesData, userInfo.age]);

  /* 선택된 마커와 일치하는 장소 찾기 */
  useEffect(() => {
    if (clickedMarkerName) {
      const selectedPlace = placesData.find(
        (place) => place[0].AREA_NM === clickedMarkerName
      );

      if (selectedPlace) {
        setAccordionState(clickedMarkerName, true);
        Object.keys(accordionStates).forEach((key) => {
          if (key !== clickedMarkerName) {
            setAccordionState(key, false);
          }
        });
      }
    }
  }, [clickedMarkerName, placesData, setAccordionState]);

  const selectedPlace = placesData.find(
    (place) => place[0].AREA_NM === clickedMarkerName
  );

  useEffect(() => {
    if (selectedPlace) {
      setAccordionState(selectedPlace[0].AREA_NM, true);
    }
  }, [selectedPlace, setAccordionState]);
  return (
    <Main>
      <SpotListContainer>
        {isLoading ? (
          <LoaderContainer>
            <BounceLoader color="#0087CA" loading={isLoading} size={60} />
          </LoaderContainer>
        ) : (
          <>
            {isOpen ? (
              <>
                <UserMainTitle>
                  <strong>{spotName}</strong>
                  {postposition} 지금!
                </UserMainTitle>
                <UserMainSubtitle>
                  가장 한산한 시간대를 확인해보세요!
                </UserMainSubtitle>
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
                <UserMainTitle>
                  {userInfo.name}님! 현재 {userInfo.age}에게
                  <strong> 인기가 많은 </strong>
                  곳이에요!
                </UserMainTitle>
                <UserMainSubtitle>
                  저희가 한눈에 보실 수 있도록 모아봤어요!
                </UserMainSubtitle>
              </>
            )}
            {selectedPlace && (
              <SpotList
                place={selectedPlace[0]}
                hotPlaces={hotPlaces}
                isOpen={true}
                setAccordionState={setAccordionState}
              />
            )}
            {selectedPlace &&
            selectedPlace.FCST_PPLTN &&
            selectedPlace.FCST_PPLTN.length > 0 ? (
              <SpotList
                place={selectedPlace[0]}
                hotPlaces={hotPlaces}
                isOpen={true}
                setAccordionState={setAccordionState}
              />
            ) : null}

            {hotPlaces.map((place, index) => (
              <SpotList
                key={index}
                place={place[0]}
                hotPlaces={hotPlaces}
                isOpen={false}
                setAccordionState={setAccordionState}
              />
            ))}
          </>
        )}
      </SpotListContainer>
      <KakaoMap />
    </Main>
  );
}
