import { useState, useEffect, useCallback } from "react";
import { ResponsiveBarCanvas } from "@nivo/bar";
import UseGetData from "../hooks/useFetchData";
import useSpotListStore from "../store/spotListStore";
import useUserStore from "../store/userStore";
import * as S from "../assets/components.styled/SpotList.styled";

export default function SpotList({ place }) {
  const { accordionStates, setAccordionState, setCoordinates } =
    useSpotListStore();
  const {
    isLoggedIn,
    openLoginModal,
    favoriteSpots,
    addFavorite,
    removeFavorite,
  } = useUserStore();
  const isFavorited = favoriteSpots.some(
    (spot) => spot.AREA_NM === place.AREA_NM
  );
  const { data } = UseGetData();
  const [address, setAddress] = useState("");
  const isOpen = accordionStates[place.AREA_NM] || false;

  /*  아코디언 토글 */
  const toggleAccordion = () => {
    setAccordionState(place.AREA_NM, !isOpen);
  };

  /*찜하기(하트) 클릭 시*/
  const handleHeartClick = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }
    isFavorited ? removeFavorite(place) : addFavorite(place);
    alert(
      isFavorited
        ? "찜한 목록에서 제거되었습니다."
        : "찜한 목록에 추가되었습니다."
    );
  };

  const ageGroups = {
    "10대": { rate: place.PPLTN_RATE_10, color: "#FFAFA3" },
    "20대": { rate: place.PPLTN_RATE_20, color: "#FFC470" },
    "30대": { rate: place.PPLTN_RATE_30, color: "#FFD966" },
    "40대": { rate: place.PPLTN_RATE_40, color: "#85E0A3" },
    "50대": { rate: place.PPLTN_RATE_50, color: "#80CAFF" },
    "60대": { rate: place.PPLTN_RATE_60, color: "#D9B8FF" },
  };

  /* 나이대별 데이터에서 가장 높은 비율 찾기 */
  const popularAgeGroup = Object.keys(ageGroups).reduce(
    (maxGroup, currentGroup) => {
      return parseFloat(ageGroups[currentGroup].rate) >
        parseFloat(ageGroups[maxGroup].rate)
        ? currentGroup
        : maxGroup;
    },
    "10대"
  );
  const popularAgeColor = ageGroups[popularAgeGroup].color;

  const ageData = [
    {
      ageGroup: "연령대별 비율",
      ...Object.fromEntries(
        Object.keys(ageGroups).map((ageGroup) => [
          ageGroup,
          ageGroups[ageGroup].rate,
        ])
      ),
    },
  ];
  /* 한산한 시간대 구하기 */
  const quietTimeData = place.FCST_PPLTN.reduce((min, current) => {
    return parseInt(current.FCST_PPLTN_MIN) < parseInt(min.FCST_PPLTN_MIN)
      ? current
      : min;
  });

  const quietTimeHour = new Date(quietTimeData.FCST_TIME).getHours();
  const quietHour = quietTimeHour < 10 ? `0${quietTimeHour}` : quietTimeHour;

  /* Kakao 지도 API로 좌표를 주소로 변환 */
  const getAddress = useCallback((lat, lng) => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    const coord = new window.kakao.maps.LatLng(lat, lng);

    const callback = function (result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        setAddress(result[0].address.address_name);
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  }, []);

  useEffect(() => {
    if (data && place.AREA_NM) {
      const matchedPlace = data.find((item) => item.name === place.AREA_NM);
      if (matchedPlace) {
        getAddress(matchedPlace.latitude, matchedPlace.longitude);
        if (isOpen) {
          setCoordinates(
            place.AREA_NM,
            matchedPlace.latitude,
            matchedPlace.longitude
          );
        }
      }
    }
  }, [data, place.AREA_NM, getAddress, isOpen, setCoordinates]);

  return (
    <S.StyledSpotList className="border-radius-default">
      <S.ListCon onClick={toggleAccordion}>
        <S.SpotImg
          src={`https://data.seoul.go.kr/SeoulRtd/images/hotspot/${place.AREA_NM}.jpg`}
          alt="Spot Image"
          className="border-radius-thin"
        />
        <S.HeartImg
          src={isFavorited ? "/img/RedHeart.svg" : "/img/ListHeart.svg"}
          alt="Heart Icon"
          onClick={handleHeartClick}
        />
        <S.ListContents>
          <h3>{place.AREA_NM}</h3>
          <p className="font-weight-regular">
            <img src="/img/ListSpotMark.svg" />
            {address}
          </p>
          <p>{place.AREA_CONGEST_MSG}</p>
          <S.IconText>
            <img src="/img/woman.jpg" alt="Woman Icon" />
            <span>{place.FEMALE_PPLTN_RATE}</span>
          </S.IconText>
          <S.IconText>
            <img src="/img/man.jpg" alt="Man Icon" />
            <span> {place.MALE_PPLTN_RATE}</span>
          </S.IconText>
          <S.BtnCon>
            <S.Congestion className="border-radius-default font-size-small font-weight-bold ">
              {place.AREA_CONGEST_LVL}
            </S.Congestion>
            <S.Popular
              className="border-radius-default font-size-small font-weight-bold"
              $ageGroup={popularAgeColor}
            >
              {popularAgeGroup}한테 인기 많아요
            </S.Popular>
          </S.BtnCon>
          <S.ArrowBtn>
            <img src={isOpen ? "/img/UpArrow.svg" : "/img/DownArrow.svg"} />
          </S.ArrowBtn>
        </S.ListContents>
      </S.ListCon>
      <S.Details $isOpen={isOpen}>
        <S.QuietTime className="border-radius-default">
          <h2>
            <strong>{quietHour}</strong>시에 가장 한적해요!
          </h2>
        </S.QuietTime>

        <div style={{ height: "100px", marginTop: "1rem" }}>
          <p>
            <strong>연령대별 비율</strong>
          </p>
          <ResponsiveBarCanvas
            data={ageData}
            keys={Object.keys(ageGroups)}
            indexBy="ageGroup"
            margin={{ top: 20, bottom: 40 }}
            padding={0.3}
            layout="horizontal"
            colors={(bar) => ageGroups[bar.id].color}
            borderWidth={0}
            enableLabel={true}
            labelTextColor="#000"
            label={(bar) => `${Math.round(bar.value)}%`}
            labelSkipWidth={0}
            labelSkipHeight={0}
            axisBottom={null}
            axisLeft={null}
            enableGridY={false}
            tooltip={(bar) => (
              <S.CustomTooltip>
                <strong>{bar.id}</strong>: {Math.round(bar.value)}%
              </S.CustomTooltip>
            )}
          />
        </div>

        <S.AgeBar>
          {Object.keys(ageGroups).map((ageGroup) => (
            <S.AgeItem key={ageGroup} color={ageGroups[ageGroup].color}>
              <span className="border-radius-circle"></span> <p>{ageGroup}</p>
            </S.AgeItem>
          ))}
        </S.AgeBar>
      </S.Details>
    </S.StyledSpotList>
  );
}
