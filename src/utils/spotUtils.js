export function handleSelectedMarker(
  clickedMarkerName,
  selectedPlace,
  accordionStates,
  setAccordionState
) {
  if (clickedMarkerName && selectedPlace) {
    setAccordionState(clickedMarkerName, true);
    Object.keys(accordionStates).forEach((key) => {
      if (key !== clickedMarkerName) {
        setAccordionState(key, false);
      }
    });
  }
}

export function scrollToFirstList(
  spotListContainerRef,
  hotPlaces,
  selectedPlace,
  setAccordionState
) {
  if (
    spotListContainerRef.current &&
    hotPlaces.length > 0 &&
    selectedPlace &&
    selectedPlace.length > 0
  ) {
    spotListContainerRef.current.scrollTop = 0;
    setAccordionState(selectedPlace[0].AREA_NM, true);
  }
}
