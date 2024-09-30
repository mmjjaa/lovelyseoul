import { create } from "zustand";

/* 장소 인포윈도우 클릭하거나 장소 검색 했을 때 사용하는 zustand */
const usePlaceMarkerStore = create((set) => ({
  clickedMarkerName: "",
  setClickedMarkerName: (name) => set({ clickedMarkerName: name }),
}));

export default usePlaceMarkerStore;
