import { MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import usePlaceMarkerStore from "../store/clickPlaceMarkerStore";
import { useNavigate } from "react-router-dom";

const InfoWindow = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  z-index: 100;
  width: 290px;
  cursor: pointer;

  button {
    cursor: pointer;
    position: absolute;
    color: #999;
    font-size: 30px;
    right: 0px;
    top: 0px;
  }
`;

const InfoWindowContents = styled.div`
  align-items: center;
  justify-content: center;
  text-align: center;

  img {
    width: 250px;
    height: 200px;
  }
  p {
    font-weight: bold;
  }
`;

export default function PlaceMarker({ id, position, name, isOpen, onClick }) {
  const { setClickedMarkerName } = usePlaceMarkerStore();
  const navigate = useNavigate();

  /*마커 클릭했을 때 나오는 인포윈도우 클릭 시*/
  const handleInfoWindowClick = () => {
    setClickedMarkerName(name);
    navigate("/");
  };

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
        <InfoWindow className="box-shadow" onClick={handleInfoWindowClick}>
          {console.log("InfoWindowContents name:", name)}
          <div>
            <button onClick={onClick}>x</button>
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
}
