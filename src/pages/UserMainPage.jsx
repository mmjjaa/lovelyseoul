import SpotList from "../components/SpotList";
import KakaoMap from "../layout/KakaoMap";
import CurrentLocationBtn from "../components/CurrentLocationBtn";
import CulturalEventsBtn from "../components/CulturalEventsBtn";
import { Link } from "react-router-dom";
import useUserStore from "../store/userStore";
import UseFetchPeopleData from "../hooks/useFetchPeopleData";
import { useState, useEffect, useRef } from "react";
import useSpotListStore from "../store/spotListStore";
import usePlaceMarkerStore from "../store/clickPlaceMarkerStore";
import { checkKorean } from "../utils/checkKorean";
import * as S from "../assets/pages.styled/UserMainPage.styled";
import { handleSelectedMarker, scrollToFirstList } from "../utils/spotUtils";
import Loading from "../components/Loading";

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
              {isOpen ? (
                <>
                  <S.UserMainTitle>
                    <strong>{spotName}</strong>
                    {postposition} 지금!
                  </S.UserMainTitle>
                  <S.UserMainSubtitle>
                    가장 한산한 시간대를 확인해보세요!
                  </S.UserMainSubtitle>
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
                  <S.UserMainTitle>
                    {userInfo.name}님! 현재 {userInfo.age}대에게
                    <strong> 인기가 많은 </strong>
                    곳이에요!
                  </S.UserMainTitle>
                  <S.UserMainSubtitle>
                    저희가 한눈에 보실 수 있도록 모아봤어요!
                  </S.UserMainSubtitle>
                </>
              )}
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
