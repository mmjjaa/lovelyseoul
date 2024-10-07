import { create } from "zustand";

const useSpotListStore = create((set) => ({
  accordionStates: {},
  coordinates: {},
  setAccordionState: (spotName, isOpen) =>
    set((state) => {
      const newAccordionStates = { [spotName]: isOpen };
      Object.keys(state.accordionStates).forEach((key) => {
        if (key !== spotName) {
          newAccordionStates[key] = false;
        }
      });
      return {
        accordionStates: newAccordionStates,
      };
    }),
  setCoordinates: (spotName, latitude, longitude) =>
    set((state) => ({
      coordinates: {
        ...state.coordinates,
        [spotName]: { latitude, longitude },
      },
    })),
}));

export default useSpotListStore;
