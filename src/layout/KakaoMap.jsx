import styled from "styled-components";
import { useState, useEffect } from "react";
import { Map } from "react-kakao-maps-sdk";
import UseGetData from "../hooks/useGetData";
import PlaceMarker from "../components/PlaceMarker";
import EventMarker from "../components/EventMarker";

const StyledKakaoMap = styled.div`
  width: 60%;
  height: 100vh;
  position: relative;
  border-radius: 15px;
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
  border: none;
  outline: none;
  margin: 5px;
  padding: 10px;
  background-color: inherit;
  cursor: pointer;
`;

export default function KakaoMap() {
  const [level, setLevel] = useState(9);
  const { data, isLoading } = UseGetData();
  const [openPlaceInfoWindow, setOpenPlaceInfoWindow] = useState(null);
  const [openEventInfoWindow, setOpenEventInfoWindow] = useState(null);
  const [eventMarkers, setEventMarkers] = useState([]);
  const API_KEY = import.meta.env.VITE_APP_SEOUL_KEY;

  useEffect(() => {
    console.log(data);
  }, [data]);

  const zoomIn = () => {
    setLevel((prevLevel) => Math.max(prevLevel - 1, 1));
  };

  const zoomOut = () => {
    setLevel((prevLevel) => Math.min(prevLevel + 1, 14));
  };

  const handleMarkerClick = async (latitude, longitude, name) => {
    const key = `${latitude},${longitude}`;
    setOpenPlaceInfoWindow((prev) => (prev === key ? null : key));

    if (openEventInfoWindow) return;

    try {
      const res = await fetch(
        `http://openapi.seoul.go.kr:8088/${API_KEY}/json/citydata/1/5/${name}`
      );
      const result = await res.json();
      const eventData = result.CITYDATA.EVENT_STTS;

      if (eventData && eventData.length > 0) {
        setEventMarkers(
          eventData.map((event) => {
            const eventX = event.EVENT_X;
            const eventY = event.EVENT_Y;
            const eventName = event.EVENT_NM;
            const thumbnail = event.THUMBNAIL;

            return {
              lat: eventY,
              lng: eventX,
              eventName,
              thumbnail,
              key: `${eventY},${eventX}`,
            };
          })
        );
      } else {
        setEventMarkers([]);
      }
    } catch (error) {
      console.error("문화 행사 데이터를 가져오는 중 오류 발생:", error);
    }
  };
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <StyledKakaoMap>
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
          const { id, latitude, longitude, name } = placeData;
          const markerPosition = {
            lat: parseFloat(latitude),
            lng: parseFloat(longitude),
          };

          return (
            <PlaceMarker
              key={id}
              id={id}
              position={markerPosition}
              name={name}
              isOpen={openPlaceInfoWindow === `${latitude},${longitude}`}
              onClick={() => handleMarkerClick(latitude, longitude, name)}
            />
          );
        })}
        {eventMarkers.map((marker) => {
          console.log("Marker Data:", marker);
          return (
            <EventMarker
              key={marker.key}
              position={{ lat: marker.lat, lng: marker.lng }}
              name={marker.eventName}
              thumbnail={marker.thumbnail}
              isOpen={openEventInfoWindow === marker.key}
              onClick={() => {
                setOpenEventInfoWindow((prev) =>
                  prev === marker.key ? null : marker.key
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
