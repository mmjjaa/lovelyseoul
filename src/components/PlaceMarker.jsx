import { MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";

const InfoWindow = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 100;
  width: 330px;
`;

const InfoWindowContents = styled.div`
  align-items: center;
  justify-content: center;
  text-align: center;
  img {
    width: 280px;
    height: 200px;
  }

  p {
    font-weight: bold;
  }
`;

const PlaceMarker = ({ id, position, name, isOpen, onClick }) => {
  return (
    <MapMarker
      key={id}
      position={position}
      clickable={true}
      onClick={onClick}
      image={{
        src: "/img/CurrentLocation.svg",
        size: {
          width: 42,
          height: 45,
        },
      }}
    >
      {isOpen && (
        <InfoWindow>
          <div>
            <img
              alt="close"
              width="14"
              height="13"
              src="https://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/bt_close.gif"
              style={{
                position: "absolute",
                right: "5px",
                top: "5px",
                cursor: "pointer",
              }}
              onClick={onClick}
            />
            <InfoWindowContents>
              <img
                src={`https://data.seoul.go.kr/SeoulRtd/images/hotspot/${name}.jpg`}
                alt=""
              />
              <p>{name}</p>
            </InfoWindowContents>
          </div>
        </InfoWindow>
      )}
    </MapMarker>
  );
};

export default PlaceMarker;
