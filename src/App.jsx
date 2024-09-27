import { Route, Routes } from "react-router-dom";
import Header from "./layout/Header";
import UserMainPage from "./pages/UserMainPage";
import MyPage from "./pages/MyPage";
import CulturalEventsPage from "./pages/CulturalEventsPage";
import NoUserMainPage from "./pages/NoUserMainPage";
import "./common/common.css";
import LoginModal from "./components/LoginModal";
import { useState, useEffect } from "react";

function App() {
  const [currentPage, setCurrentPage] = useState("login");

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && userInfo.name && userInfo.age) {
      setCurrentPage("user");
    } else {
      setCurrentPage("login");
    }
  }, []);

  // 로그인 모달 닫을 경우
  const handleCloseModal = () => {
    setCurrentPage("noUser");
  };

  // 로그인 모달에서 로그인 할 경우
  const handleContinue = () => {
    setCurrentPage("user");
  };

  return (
    <>
      <Header />
      {currentPage === "login" && (
        <LoginModal onClose={handleCloseModal} onContinue={handleContinue} />
      )}

      <Routes>
        <Route
          path="/"
          element={
            currentPage === "user" ? <UserMainPage /> : <NoUserMainPage />
          }
        />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/culturaleventspage" element={<CulturalEventsPage />} />
      </Routes>
    </>
  );
}

export default App;
