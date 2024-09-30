import styled from "styled-components";
import KakaoMap from "../layout/KakaoMap";
import CurrentLocationBtn from "../components/CurrentLocationBtn";
import CulturalEventsBtn from "../components/CulturalEventsBtn";
import CultureList from "../components/CultureList";
import useSpotListStore from "../store/spotListStore";
import { checkKorean } from "../utils/checkKorean";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetchEventData from "../hooks/useFetchEventData";
import BounceLoader from "react-spinners/BounceLoader";

const Main = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const SpotListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  max-width: 40%;
  overflow-y: auto;
`;
const BtnCon = styled.div`
  display: flex;
  padding: 1rem;
  gap: 1rem;
`;
const CulturalEventsTitle = styled.h2`
  padding: 0 1rem;
`;
const MCulturalEventsSubtitle = styled.p`
  padding: 0 1rem;
`;
const NoEventMessage = styled.div`
  text-align: center;
  padding-top: 5rem;
  p {
    padding: 1rem;
  }
`;
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
export default function CulturalEventsPage() {
  const { fetchEventData, error } = useFetchEventData();
  const { accordionStates } = useSpotListStore();
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(true);
  const openSpotNames = Object.keys(accordionStates).filter(
    (key) => accordionStates[key]
  );
  const spotName = openSpotNames[0];
  const postposition = checkKorean(spotName);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const events = await fetchEventData(spotName);
        setEventList(events);
        console.log(events);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (spotName) {
      fetchEvents();
    }
  }, [spotName]);
  return (
    <Main>
      <SpotListContainer>
        <CulturalEventsTitle>
          <strong>{spotName}</strong>
          {postposition} 지금!
        </CulturalEventsTitle>
        <MCulturalEventsSubtitle>
          주변 문화 행사를 확인해보세요!
        </MCulturalEventsSubtitle>

        <BtnCon>
          <Link to="/">
            <CurrentLocationBtn />
          </Link>
          <CulturalEventsBtn />
        </BtnCon>
        {loading && (
          <LoaderContainer>
            <BounceLoader color="#0087CA" size={60} />
          </LoaderContainer>
        )}
        {error && <div>오류가 발생했습니다: {error.message}</div>}
        {!loading && eventList.length === 0 && (
          <NoEventMessage>
            <img src="/img/EmptySearch.svg" alt="" />
            <p>주변 문화 행사가 없습니다.</p>
          </NoEventMessage>
        )}

        {eventList.length > 0 &&
          eventList.map((event, index) => (
            <CultureList
              key={index}
              thumbnail={event.thumbnail}
              name={event.eventName}
              place={event.place}
              period={event.period}
              url={event.url}
            />
          ))}
      </SpotListContainer>
      <KakaoMap />
    </Main>
  );
}
