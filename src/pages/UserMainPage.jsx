import SpotList from "../components/SpotList";
import KakaoMap from "../layout/KakaoMap";
import useUserStore from "../store/userStore";
import UseFetchPeopleData from "../hooks/useFetchPeopleData";
import { useState, useEffect, useRef } from "react";
import useSpotListStore from "../store/spotListStore";
import usePlaceMarkerStore from "../store/clickPlaceMarkerStore";
import { checkKorean } from "../utils/checkKorean";
import * as S from "../assets/pages.styled/UserMainPage.styled";
import { handleSelectedMarker, scrollToFirstList } from "../utils/spotUtils";
import Loading from "../components/Loading";
import TitleSection from "../components/TitleSection";

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

  const selectedPlace = placesData.find(
    (place) => place[0]?.AREA_NM === clickedMarkerName
  );

  const spotListContainerRef = useRef(null);

  /* 인기 많은 곳 가져오기 */
  useEffect(() => {
    if (!isLoading && placesData.length) {
      const top10Places = placesData
        .sort(
          (a, b) =>
            b[0][`PPLTN_RATE_${userInfo.age}`] -
            a[0][`PPLTN_RATE_${userInfo.age}`]
        )
        .slice(0, 10);

      setHotPlaces(top10Places);
    }
  }, [placesData, isLoading, userInfo.age]);

  /* 선택된 마커와 일치하는 장소 찾기 */
  useEffect(() => {
    handleSelectedMarker(
      clickedMarkerName,
      selectedPlace,
      accordionStates,
      setAccordionState
    );
  }, [clickedMarkerName, placesData, setAccordionState, selectedPlace]);

  /* 선택된 장소 있을 때 첫 번째 리스트로 스크롤 */
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
              <>
                <S.PopularText className="font-weight-regular ">
                  {userInfo.age}대 비율이
                  <strong> {place[0][`PPLTN_RATE_${userInfo.age}`]}%</strong>
                  입니다.
                </S.PopularText>
                <SpotList
                  key={index}
                  place={place[0]}
                  hotPlaces={hotPlaces}
                  isOpen={false}
                  setAccordionState={setAccordionState}
                />
              </>
            ))}
          </>
        )}
      </S.SpotListContainer>
      <KakaoMap />
    </S.Main>
  );
}
