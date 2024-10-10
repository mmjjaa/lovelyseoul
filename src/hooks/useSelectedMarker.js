import { useEffect } from "react";

export function useSelectedMarker(
  clickedMarkerName,
  selectedPlace,
  accordionStates,
  setAccordionState
) {
  /* 선택된 마커와 일치하는 장소 찾기 */
  useEffect(() => {
    if (clickedMarkerName && selectedPlace) {
      if (!accordionStates[clickedMarkerName]) {
        setAccordionState(clickedMarkerName, true);
      }
      Object.keys(accordionStates).forEach((key) => {
        if (key !== clickedMarkerName && accordionStates[key]) {
          setAccordionState(key, false);
        }
      });
    }
  }, [clickedMarkerName, selectedPlace, accordionStates, setAccordionState]);
}
