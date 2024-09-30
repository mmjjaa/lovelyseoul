import { create } from "zustand";

const useSpotListStore = create((set) => ({
  accordionStates: {},
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
}));

export default useSpotListStore;
