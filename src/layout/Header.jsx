import { useState } from "react";
import { Link } from "react-router-dom";
import userStore from "../store/userStore";
import UseFetchData from "../hooks/useFetchData";
import usePlaceMarkerStore from "../store/clickPlaceMarkerStore";
import { useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import * as S from "../assets/layout.styled/Header.styled";

export default function Header() {
  const { isLoggedIn, openLoginModal } = userStore();
  const { data, isLoading } = UseFetchData();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const { setClickedMarkerName } = usePlaceMarkerStore();
  const navigate = useNavigate();

  /*검색어 필터링*/
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(debouncedQuery.toLowerCase())
  );
  const getLabelClass = (congest) => {
    switch (congest) {
      case "붐빔":
        return "red";
      case "약간 붐빔":
        return "orange";
      case "보통":
        return "yellow";
      case "여유":
        return "green";
      default:
        return "";
    }
  };

  const handleSearch = (searchTerm) => {
    const searchQuery = searchTerm || debouncedQuery;
    if (
      filteredData.some(
        (item) => item.name.toLowerCase() === searchQuery.toLowerCase()
      )
    ) {
      setClickedMarkerName(searchQuery);
      setQuery("");
      navigate("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleResultClick = (itemName) => {
    handleSearch(itemName);
  };

  return (
    <S.StyledHeader className="box-shadow">
      <div>
        <Link to="/">
          <img src="/img/logo.svg" alt="로고" />
        </Link>
      </div>
      <nav style={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
        <S.SearchCon>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="주요장소를 검색해보세요."
            className="border-radius-thin"
          />
          {debouncedQuery && (
            <S.SearchResult className="box-shadow border-radius-thin">
              {isLoading ? (
                <p>Loading...</p>
              ) : filteredData.length === 0 ? (
                <S.NoSearchResult>검색 결과가 없습니다.</S.NoSearchResult>
              ) : (
                filteredData.map((item, index) => (
                  <S.ResultItem
                    key={index}
                    onClick={() => handleResultClick(item.name)}
                  >
                    <div
                      className={`label ${getLabelClass(
                        item.congest
                      )} border-radius-default `}
                    >
                      {item.congest}
                    </div>
                    <div className="name">{item.name}</div>
                  </S.ResultItem>
                ))
              )}
            </S.SearchResult>
          )}
          <button className="border-radius-thin" onClick={handleSearch}>
            <img src="/img/search.svg" alt="검색" />
          </button>
        </S.SearchCon>
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
