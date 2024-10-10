import SpotList from "../components/SpotList";
import PopularText from "../components/PopularText";

export default function RenderList({
  place,
  hotPlaces,
  setAccordionState,
  userInfo,
  isOpen,
}) {
  return (
    <div>
      <PopularText
        age={userInfo.age}
        rate={place[`PPLTN_RATE_${userInfo.age}`]}
      />
      <SpotList
        place={place}
        hotPlaces={hotPlaces}
        isOpen={isOpen}
        setAccordionState={setAccordionState}
      />
    </div>
  );
}
