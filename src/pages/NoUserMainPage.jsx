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
import useUserStore from "../store/userStore";
import * as S from "../assets/pages.styled/NoUserMainPage.styled";
import { handleSelectedMarker, scrollToFirstList } from "../utils/spotUtils";
import Loading from "../components/Loading";

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
    handleSelectedMarker(
      clickedMarkerName,
      selectedPlace,
      accordionStates,
      setAccordionState
    );
  }, [clickedMarkerName, placesData, setAccordionState, selectedPlace]);

  /*선택된 장소 있을 때 첫 번째 리스트로 스크롤*/
  useEffect(() => {
    scrollToFirstList(
      spotListContainerRef,
      hotPlaces,
      selectedPlace,
      setAccordionState
    );
  }, [selectedPlace, hotPlaces, setAccordionState]);
  return (
    <S.Main>
      <S.SpotListContainer ref={spotListContainerRef}>
        {isLoading ? (
          <Loading isLoading={isLoading} />
        ) : (
          <>
            <S.TitleContainer>
              {isOpen ? (
                <>
                  <S.NoUserMainTitle>
                    <strong>{spotName}</strong>
                    {postposition} 지금!
                  </S.NoUserMainTitle>
                  <S.NoUserMainSubtitle>
                    가장 한산한 시간대를 확인해보세요!
                  </S.NoUserMainSubtitle>
                  <S.BtnCon>
                    <Link>
                      <CurrentLocationBtn />
                    </Link>
                    <Link to="/culturaleventspage">
                      <CulturalEventsBtn />
                    </Link>
                  </S.BtnCon>
                </>
              ) : (
                <>
                  <S.NoUserMainTitle>
                    현재 가장
                    <strong> 인기가 많은 </strong>
                    곳이에요!
                  </S.NoUserMainTitle>
                  <S.NoUserMainSubtitle>
                    저희가 한눈에 보실 수 있도록 모아봤어요!
                  </S.NoUserMainSubtitle>
                </>
              )}
            </S.TitleContainer>
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
      </S.SpotListContainer>

      <KakaoMap setHotPlaces={setHotPlaces} />

      {showLoginModal && <LoginModal setShowLoginModal={closeLoginModal} />}
    </S.Main>
  );
}
