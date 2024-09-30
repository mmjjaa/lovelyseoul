import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";
import { ResponsiveBarCanvas } from "@nivo/bar";
import UseGetData from "../hooks/useFetchData";
import useSpotListStore from "../store/spotListStore";
import useUserStore from "../store/userStore";

const StyledSpotList = styled.div`
  border: 1px solid #ccc;
  padding: 1rem;
  max-width: 700px;
  margin: 1rem;
`;

const ListCon = styled.div`
  display: flex;
  position: relative;
  padding: 1rem;
  cursor: pointer;
`;

const SpotImg = styled.img`
  width: 150px;
  height: auto;
  object-fit: cover;
`;

const HeartImg = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const ListContents = styled.div`
  flex: 1;
  padding-left: 1rem;

  p {
    margin: 0.5rem 0;
  }
`;

const IconText = styled.p`
  display: inline-flex;
  align-items: center;
  margin-right: 1rem;
  img {
    margin-right: 0.5rem;
  }
  p {
    margin-right: 1rem;
  }
`;

const BtnCon = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const CongestionBtn = styled.button`
  background-color: #ff4d4f;
  color: white;
  padding: 0.5rem 1rem;
`;
const PopularBtn = styled.button`
  background-color: ${({ ageGroup }) => ageGroup || "#ffa940"};
  color: white;
  padding: 0.5rem 1rem;
`;

const ArrowBtn = styled.button`
  cursor: pointer;
  position: absolute;
  margin: 1rem 0;
  left: 50%;
  transform: translateX(-50%);
`;

const Details = styled.div`
  padding: 1rem;
  max-height: ${({ isOpen }) => (isOpen ? "500px" : "0")};
  overflow: hidden;
  transition: max-height 0.4s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  transition: opacity 0.4s ease, max-height 0.4s ease-in-out;
  text-align: center;
`;

const QuietTime = styled.div`
  padding: 1rem;
  background-color: #eee;
  margin-top: 1rem;
`;

const AgeBar = styled.div`
  display: flex;
  margin-left: 5rem;
`;

const AgeItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;

  span {
    width: 10px;
    height: 10px;
    background-color: ${({ color }) => color};
    margin-right: 2px;
  }
  p {
    color: #ccc;
  }
`;
const CustomTooltip = styled.div`
  background: white;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
`;
export default function SpotList({ place }) {
  const { accordionStates, setAccordionState } = useSpotListStore();
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

  /*  자세히 보기(아코디언) */
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
    if (isFavorited) {
      removeFavorite(place);
      alert("찜한 목록에서 제거되었습니다.");
    } else {
      addFavorite(place);
      alert("찜한 목록에 추가되었습니다.");
    }
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
    const matchedPlace = data.find((item) => item.name === place.AREA_NM);
    if (matchedPlace) {
      getAddress(matchedPlace.latitude, matchedPlace.longitude);
    }
  }, [data, place.AREA_NM, getAddress]);

  return (
    <StyledSpotList className="border-radius-default">
      <ListCon onClick={toggleAccordion}>
        <SpotImg
          src={`https://data.seoul.go.kr/SeoulRtd/images/hotspot/${place.AREA_NM}.jpg`}
          alt="Spot Image"
          className="border-radius-thin"
        />
        <HeartImg
          src={isFavorited ? "/img/RedHeart.svg" : "/img/ListHeart.svg"}
          alt="Heart Icon"
          onClick={handleHeartClick}
        />
        <ListContents>
          <h3>{place.AREA_NM}</h3>
          <IconText>
            <img src="/img/ListSpotMark.svg" />
            {address}
          </IconText>
          <p>{place.AREA_CONGEST_MSG}</p>
          <IconText>
            <img src="/img/woman.jpg" alt="Woman Icon" />
            <p>{place.FEMALE_PPLTN_RATE}</p>
            <img src="/img/man.jpg" alt="Man Icon" />
            <p>{place.MALE_PPLTN_RATE}</p>
          </IconText>
          <BtnCon>
            <CongestionBtn className="border-radius-default font-size-small ">
              {place.AREA_CONGEST_LVL}
            </CongestionBtn>
            <PopularBtn
              className="border-radius-default font-size-small"
              ageGroup={popularAgeColor}
            >
              {popularAgeGroup}한테 인기 많아요
            </PopularBtn>
          </BtnCon>
          <ArrowBtn>
            <img src={isOpen ? "/img/UpArrow.svg" : "/img/DownArrow.svg"} />
          </ArrowBtn>
        </ListContents>
      </ListCon>
      <Details isOpen={isOpen}>
        <QuietTime className="border-radius-default">
          <h2>
            <strong>{quietTimeHour}</strong>시에 가장 한적해요!
          </h2>
        </QuietTime>

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
              <CustomTooltip>
                <strong>{bar.id}</strong>: {Math.round(bar.value)}%
              </CustomTooltip>
            )}
          />
        </div>

        <AgeBar>
          {Object.keys(ageGroups).map((ageGroup) => (
            <AgeItem key={ageGroup} color={ageGroups[ageGroup].color}>
              <span className="border-radius-circle"></span> <p>{ageGroup}</p>
            </AgeItem>
          ))}
        </AgeBar>
      </Details>
    </StyledSpotList>
  );
}
