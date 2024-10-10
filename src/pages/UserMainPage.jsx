import SpotList from "../components/SpotList";
import KakaoMap from "../layout/KakaoMap";
import useUserStore from "../store/userStore";
import UseFetchPeopleData from "../hooks/useFetchPeopleData";
import { useRef } from "react";
import useSpotListStore from "../store/spotListStore";
import usePlaceMarkerStore from "../store/clickPlaceMarkerStore";
import * as S from "../assets/pages.styled/UserMainPage.styled";
import Loading from "../components/Loading";
import TitleSection from "../components/TitleSection";
import useHotPlaces from "../hooks/useHotPlaces";
import { useSelectedMarker } from "../hooks/useSelectedMarker";
import { useScrollToFirstList } from "../hooks/useScroll";
import { useOpenSpotInfo } from "../hooks/useOpenSpotInfo";
import RenderList from "../components/UserRenderList";

export default function UserMain() {
  const { userInfo } = useUserStore();
  const { placesData, isLoading } = UseFetchPeopleData();
  const { clickedMarkerName } = usePlaceMarkerStore();
  const { accordionStates, setAccordionState } = useSpotListStore();
  const hotPlaces = useHotPlaces(placesData, userInfo.age, isLoading);
  const { spotName, isOpen, postposition } = useOpenSpotInfo(accordionStates);
  const selectedPlace = placesData.find(
    (place) => place[0]?.AREA_NM === clickedMarkerName
  );
  const spotListContainerRef = useRef(null);

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
                userInfo={userInfo}
              />
            </S.TitleContainer>
            {selectedPlace && selectedPlace[0] && (
              <SpotList
                place={selectedPlace[0]}
                hotPlaces={hotPlaces}
                isOpen={true}
                setAccordionState={setAccordionState}
              />
            )}

            {hotPlaces.map((place, index) => (
              <RenderList
                key={`${place[0].AREA_NM}-${index}`}
                place={place[0]}
                hotPlaces={hotPlaces}
                setAccordionState={setAccordionState}
                userInfo={userInfo}
                isOpen={false}
              />
            ))}
          </>
        )}
      </S.SpotListContainer>
      <KakaoMap />
    </S.Main>
  );
}
