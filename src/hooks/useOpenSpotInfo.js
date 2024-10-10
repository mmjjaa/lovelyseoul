import { checkKorean } from "../utils/checkKorean";

export function useOpenSpotInfo(accordionStates) {
  const openSpotNames = Object.keys(accordionStates).filter(
    (key) => accordionStates[key]
  );
  const spotName = openSpotNames[0];
  const isOpen = openSpotNames.length > 0;
  const postposition = checkKorean(spotName);

  return { spotName, isOpen, postposition };
}
