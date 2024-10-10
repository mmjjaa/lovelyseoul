import { useState, useEffect, useRef } from "react";
import SpotList from "../components/SpotList";
import LoginModal from "../components/LoginModal";
import KakaoMap from "../layout/KakaoMap";
import UseFetchPeopleData from "../hooks/useFetchPeopleData";
import useSpotListStore from "../store/spotListStore";
import usePlaceMarkerStore from "../store/clickPlaceMarkerStore";
import useUserStore from "../store/userStore";
import * as S from "../assets/pages.styled/NoUserMainPage.styled";
import { useSelectedMarker } from "../hooks/useSelectedMarker";
import { useScrollToFirstList } from "../hooks/useScroll";
import Loading from "../components/Loading";
import TitleSection from "../components/TitleSection";
import { useOpenSpotInfo } from "../hooks/useOpenSpotInfo";

export default function NoUserMainPage() {
  const { showLoginModal, openLoginModal, closeLoginModal } = useUserStore();
  const { placesData, isLoading } = UseFetchPeopleData();
  const [hotPlaces, setHotPlaces] = useState([]);
  const { clickedMarkerName } = usePlaceMarkerStore();
  const { accordionStates, setAccordionState } = useSpotListStore();
  const { spotName, isOpen, postposition } = useOpenSpotInfo(accordionStates);

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

  /* 선택된 마커와 일치하는 장소 찾기 */
  useSelectedMarker(
    clickedMarkerName,
    selectedPlace,
    accordionStates,
    setAccordionState
  );

  /* 선택된 장소 있을 때 첫 번째 리스트로 스크롤 */
  useScrollToFirstList(
    spotListContainerRef,
    hotPlaces,
    selectedPlace,
    accordionStates,
    setAccordionState
  );

  return (
    <S.Main>
      <S.SpotListContainer ref={spotListContainerRef}>
        {isLoading ? (
          <Loading isLoading={isLoading} />
        ) : (
          <>
            <S.TitleContainer>
              <TitleSection
                isOpen={isOpen}
                spotName={spotName}
                postposition={postposition}
              />
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
