import { useEffect } from "react";

export function useScrollToFirstList(
  spotListContainerRef,
  hotPlaces,
  selectedPlace,
  accordionStates,
  setAccordionState
) {
  /* 선택된 장소 있을 때 첫 번째 리스트로 스크롤 */
  useEffect(() => {
    if (
      spotListContainerRef.current &&
      hotPlaces.length > 0 &&
      selectedPlace &&
      selectedPlace.length > 0
    ) {
      spotListContainerRef.current.scrollTop = 0;
      if (!accordionStates[selectedPlace[0].AREA_NM]) {
        setAccordionState(selectedPlace[0].AREA_NM, true);
      }
    }
  }, [selectedPlace, hotPlaces, setAccordionState, spotListContainerRef]);
}
