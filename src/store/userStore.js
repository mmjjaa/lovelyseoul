import { create } from "zustand";

const useUserStore = create((set) => ({
  userInfo: null,
  isLoggedIn: false,
  showLoginModal: false,
  favoriteSpots: [],

  login: (userInfo) => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    set({ userInfo, isLoggedIn: true, showLoginModal: false });

    const storedFavorites =
      JSON.parse(localStorage.getItem("favoriteSpots")) || [];
    set({ favoriteSpots: storedFavorites });
  },

  openLoginModal: () => set({ showLoginModal: true }),
  closeLoginModal: () => set({ showLoginModal: false }),

  addFavorite: (spot) =>
    set((state) => {
      const isAlreadyFavorited = state.favoriteSpots.some(
        (fav) => fav.AREA_NM === spot.AREA_NM
      );
      if (isAlreadyFavorited) {
        alert("이미 찜한 장소입니다.");
        return state;
      }
      const updatedFavorites = [...state.favoriteSpots, spot];
      localStorage.setItem("favoriteSpots", JSON.stringify(updatedFavorites));
      return { favoriteSpots: updatedFavorites };
    }),

  removeFavorite: (spot) =>
    set((state) => {
      const updatedFavorites = state.favoriteSpots.filter(
        (fav) => fav.AREA_NM !== spot.AREA_NM
      );
      localStorage.setItem("favoriteSpots", JSON.stringify(updatedFavorites));
      return { favoriteSpots: updatedFavorites };
    }),

  initializeUserInfo: () => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      set({ userInfo: JSON.parse(storedUserInfo), isLoggedIn: true });
      const storedFavorites =
        JSON.parse(localStorage.getItem("favoriteSpots")) || [];
      set({ favoriteSpots: storedFavorites });
    }
  },
}));

export default useUserStore;
