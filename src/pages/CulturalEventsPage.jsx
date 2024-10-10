import KakaoMap from "../layout/KakaoMap";
import CurrentLocationBtn from "../components/MainPageBtn/CurrentLocationBtn";
import CulturalEventsBtn from "../components/MainPageBtn/CulturalEventsBtn";
import CultureList from "../components/CultureList";
import useSpotListStore from "../store/spotListStore";
import { checkKorean } from "../utils/checkKorean";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetchEventData from "../hooks/useFetchEventData";
import BounceLoader from "react-spinners/BounceLoader";
import * as S from "../assets/pages.styled/CulturalEventsPage.styled";

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
    <S.Main>
      <S.SpotListContainer>
        <S.EventsTitle>
          <strong>{spotName}</strong>
          {postposition} 지금!
        </S.EventsTitle>
        <S.EventsSubtitle>주변 문화 행사를 확인해보세요!</S.EventsSubtitle>

        <S.BtnCon>
          <Link to="/">
            <CurrentLocationBtn />
          </Link>
          <CulturalEventsBtn />
        </S.BtnCon>
        {loading && (
          <S.LoaderContainer>
            <BounceLoader color="#0087CA" size={60} />
          </S.LoaderContainer>
        )}
        {error && <div>오류가 발생했습니다: {error.message}</div>}
        {!loading && eventList.length === 0 && (
          <S.NoEventMessage>
            <img src="/img/EmptySearch.svg" alt="" />
            <p>주변 문화 행사가 없습니다.</p>
          </S.NoEventMessage>
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
      </S.SpotListContainer>
      <KakaoMap />
    </S.Main>
  );
}
