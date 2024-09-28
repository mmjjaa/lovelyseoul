import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";
import { ResponsiveBarCanvas } from "@nivo/bar";
import UseGetData from "../hooks/useGetData";

const StyledSpotList = styled.div`
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 1rem;
  max-width: 700px;
  margin: 1rem;
`;

const ListCon = styled.div`
  display: flex;
  position: relative;
  padding: 1rem;
  border-radius: 20px;
`;

const SpotImg = styled.img`
  width: 150px;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
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
  h3 {
    font-size: 24px;
    font-weight: bold;
    font-family: "Do Hyeon", sans-serif;
  }
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
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 14px;
`;
const PopularBtn = styled.button`
  background-color: ${({ ageGroup }) => ageGroup || "#ffa940"};
  color: white;
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  font-size: 14px;
`;

const ArrowBtn = styled.button`
  background: inherit;
  border: none;
  cursor: pointer;
  position: absolute;
  bottom: 0;
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
  font-size: 24px;
  font-weight: bold;
`;

const QuietTime = styled.div`
  padding: 1rem;
  font-size: 28px;
  font-weight: bold;
  background-color: #eee;
  border-radius: 20px;
  strong {
    color: #0087ca;
  }
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
    border-radius: 50%;
    margin-right: 2px;
  }
  p {
    font-size: 14px;
    color: #ccc;
  }
`;

export default function SpotList({ setShowLoginModal, isFavorited, place }) {
  const [isOpen, setIsOpen] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [isHeart, setIsHeart] = useState(isFavorited);
  const { data } = UseGetData();
  const [address, setAddress] = useState("");

  //  자세히 보기(아코디언)
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  // 찜하기 클릭 시
  const handleHeartClick = () => {
    if (!userInfo) {
      setShowLoginModal(true);
      return;
    }

    const favoriteSpots =
      JSON.parse(localStorage.getItem("favoriteSpots")) || [];
    const currentSpot = {
      name: place.AREA_NM,
    };

    if (isFavorited) {
      const updatedFavorites = favoriteSpots.filter(
        (spot) => spot.name !== currentSpot.name
      );
      localStorage.setItem("favoriteSpots", JSON.stringify(updatedFavorites));
      setIsHeart(false);
      alert("찜한 목록에서 제거되었습니다.");
    } else {
      favoriteSpots.push(currentSpot);
      localStorage.setItem("favoriteSpots", JSON.stringify(favoriteSpots));
      setIsHeart(true);
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

  // 나이대별 데이터에서 가장 높은 비율
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
  const totalRate = Object.values(ageGroups).reduce(
    (total, group) => total + parseFloat(group.rate),
    0
  );
  const ageData = [
    {
      ageGroup: "연령대 비율",
      ...Object.fromEntries(
        Object.keys(ageGroups).map((ageGroup) => [
          ageGroup,
          (ageGroups[ageGroup].rate / totalRate) * 100,
        ])
      ),
    },
  ];
  // 한산한 시간대 구하기
  const quietTimeData = place.FCST_PPLTN.reduce((min, current) => {
    return parseInt(current.FCST_PPLTN_MIN) < parseInt(min.FCST_PPLTN_MIN)
      ? current
      : min;
  });

  const quietTimeHour = new Date(quietTimeData.FCST_TIME).getHours();

  // Kakao 지도 API로 좌표를 주소로 변환
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
    <StyledSpotList>
      <ListCon>
        <SpotImg
          src={`https://data.seoul.go.kr/SeoulRtd/images/hotspot/${place.AREA_NM}.jpg`}
          alt="Spot Image"
        />
        <HeartImg
          src={isHeart ? "/img/RedHeart.svg" : "/img/ListHeart.svg"}
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
            <CongestionBtn>{place.AREA_CONGEST_LVL}</CongestionBtn>
            <PopularBtn ageGroup={popularAgeColor}>
              {popularAgeGroup}한테 인기 많아요
            </PopularBtn>
          </BtnCon>
          <ArrowBtn onClick={toggleAccordion}>
            <img src="/img/DownArrow.svg" alt="Toggle Details" />
          </ArrowBtn>
        </ListContents>
      </ListCon>
      <Details isOpen={isOpen}>
        <QuietTime>
          <strong>{quietTimeHour}</strong>시에 가장 한적해요!
        </QuietTime>

        <div style={{ height: "100px", marginTop: "1rem" }}>
          <ResponsiveBarCanvas
            data={ageData}
            keys={Object.keys(ageGroups)}
            indexBy="ageGroup"
            margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
            padding={0.3}
            layout="horizontal"
            colors={(bar) => ageGroups[bar.id].color}
            borderWidth={0}
            enableLabel={false}
            labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            labelPosition="right"
            labelOffset={12}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legendPosition: "middle",
              legendOffset: 36,
            }}
            axisLeft={null}
            enableGridY={false}
            enableGridX={false}
          />
        </div>

        <AgeBar>
          {Object.keys(ageGroups).map((ageGroup) => (
            <AgeItem key={ageGroup} color={ageGroups[ageGroup].color}>
              <span></span> <p>{ageGroup}</p>
            </AgeItem>
          ))}
        </AgeBar>
      </Details>
    </StyledSpotList>
  );
}
