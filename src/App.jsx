import { Route, Routes } from "react-router-dom";
import Header from "./layout/Header";
import UserMainPage from "./pages/UserMainPage";
import MyPage from "./pages/MyPage";
import CulturalEventsPage from "./pages/CulturalEventsPage";
import NoUserMainPage from "./pages/NoUserMainPage";
import GlobalStyle from "./common/GlobalStyle";
import LoginModal from "./components/LoginModal";
import { useEffect } from "react";
import useUserStore from "./store/userStore";

function App() {
  const {
    isLoggedIn,
    showLoginModal,
    closeLoginModal,
    initializeUserInfo,
  } = useUserStore();

  useEffect(() => {
    initializeUserInfo();
  }, [initializeUserInfo]);

  const handleCloseModal = () => {
    closeLoginModal();
  };

  return (
    <>
      <GlobalStyle />
      <Header />
      {showLoginModal && <LoginModal onClose={handleCloseModal} />}
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <UserMainPage /> : <NoUserMainPage />}
        />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/culturaleventspage" element={<CulturalEventsPage />} />
      </Routes>
    </>
  );
}

export default App;
