import { Link } from "react-router-dom";
import userStore from "../store/userStore";
import * as S from "../assets/layout.styled/Header.styled";
import SearchBar from "../components/search/SearchBar";

export default function Header() {
  const { isLoggedIn, openLoginModal } = userStore();

  return (
    <S.StyledHeader className="box-shadow">
      <div>
        <Link to="/">
          <img src="/img/logo.svg" alt="로고" />
        </Link>
      </div>
      <nav style={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
        <SearchBar />
        <S.MyPage
          to={isLoggedIn ? "/mypage" : "#"}
          onClick={!isLoggedIn ? openLoginModal : null}
        >
          <img src="/img/mypage.svg" alt="마이페이지 버튼" />
          <h3>MY</h3>
        </S.MyPage>
      </nav>
    </S.StyledHeader>
  );
}
