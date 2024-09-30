import styled from "styled-components";
import { useState, useEffect } from "react";
import { Map } from "react-kakao-maps-sdk";
import UseFetchData from "../hooks/useFetchData";
import PlaceMarker from "../components/PlaceMarker";
import EventMarker from "../components/EventMarker";
import useFetchEventData from "../hooks/useFetchEventData";
import BounceLoader from "react-spinners/BounceLoader";

const StyledKakaoMap = styled.div`
  width: 60%;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

const ZoomControls = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  flex-direction: row;
  z-index: 10;
`;

const ZoomButton = styled.button`
  margin: 5px;
  padding: 10px;
  cursor: pointer;
`;

export default function KakaoMap() {
  const [level, setLevel] = useState(9);
  const { data, isLoading } = UseFetchData();
  const [openPlaceInfoWindow, setOpenPlaceInfoWindow] = useState(null);
  const [openEventInfoWindow, setOpenEventInfoWindow] = useState(null);
  const { eventMarkers, fetchEventData, error } = useFetchEventData();

  useEffect(() => {
    console.log(data);
  }, [data]);

  const zoomIn = () => {
    setLevel((prevLevel) => Math.max(prevLevel - 1, 1));
  };

  const zoomOut = () => {
    setLevel((prevLevel) => Math.min(prevLevel + 1, 14));
  };

  /*장소 마커 인포윈도우 열고 닫기*/
  const handleMarkerClick = async (id, name) => {
    setOpenPlaceInfoWindow((prev) => (prev === id ? null : id));

    console.log(name);

    if (openEventInfoWindow) return;
    await fetchEventData(name);
  };

  if (isLoading) {
    return <BounceLoader color="#0087CA" size={60} />;
  }
  if (error) {
    return <div>데이터 로딩 중 오류 발생: {error.message}</div>;
  }
  return (
    <StyledKakaoMap className="border-radius-default">
      <Map
        id={`map`}
        center={{
          lat: 37.574187,
          lng: 126.976882,
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
        level={level}
      >
        {data.map((placeData) => {
          const { latitude, longitude, name } = placeData;
          const markerPosition = {
            lat: parseFloat(latitude),
            lng: parseFloat(longitude),
          };
          const key = `${latitude},${longitude}`;
          return (
            <PlaceMarker
              key={key}
              id={key}
              position={markerPosition}
              name={name}
              isOpen={openPlaceInfoWindow === key}
              onClick={() => handleMarkerClick(key, name)}
            />
          );
        })}
        {eventMarkers.map((marker) => {
          console.log("Marker Data:", marker);
          const eventKey = `${marker.eventName}-${marker.lat},${marker.lng}`;
          return (
            <EventMarker
              key={eventKey}
              position={{ lat: marker.lat, lng: marker.lng }}
              name={marker.eventName}
              thumbnail={marker.thumbnail}
              place={marker.place}
              period={marker.period}
              url={marker.url}
              isOpen={openEventInfoWindow === eventKey}
              onClick={() => {
                setOpenEventInfoWindow((prev) =>
                  prev === eventKey ? null : eventKey
                );
              }}
            />
          );
        })}
      </Map>
      <ZoomControls>
        <ZoomButton onClick={zoomOut}>
          <img src="/img/ZoomOut.svg" alt="Zoom Out" />
        </ZoomButton>
        <ZoomButton onClick={zoomIn}>
          <img src="/img/ZoomIn.svg" alt="Zoom In" />
        </ZoomButton>
      </ZoomControls>
    </StyledKakaoMap>
  );
}
