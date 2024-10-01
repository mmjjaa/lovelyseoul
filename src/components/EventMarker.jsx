import { MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";

const InfoWindow = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  z-index: 100;
  width: 330px;
  cursor: pointer;
  button {
    position: absolute;
    color: #999;
    font-size: 40px;
    right: 0px;
    top: 0px;
  }
`;

const InfoWindowContents = styled.div`
  align-items: center;
  justify-content: center;
  text-align: center;
  img {
    width: 280px;
    height: 200px;
  }
`;

export default function EventMarker({
  position,
  name,
  thumbnail,
  isOpen,
  onClick,
  url,
}) {
  return (
    <MapMarker
      position={position}
      clickable={true}
      onClick={onClick}
      image={{
        src: "/img/CulturalEvents.svg",
        size: {
          width: 42,
          height: 45,
        },
      }}
    >
      {isOpen && (
        <InfoWindow
          className="box-shadow border-radius-default"
          onClick={() => {
            window.open(url);
          }}
        >
          <div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick(e);
              }}
            >
              x
            </button>
            <InfoWindowContents>
              <img className="border-radius-thin" src={thumbnail} alt={name} />
              <p className="font-weight-bold">{name}</p>
            </InfoWindowContents>
          </div>
        </InfoWindow>
      )}
    </MapMarker>
  );
}
