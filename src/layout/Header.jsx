import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import userStore from "../store/userStore";
import UseFetchData from "../hooks/useFetchData";
import usePlaceMarkerStore from "../store/clickPlaceMarkerStore";
import { useNavigate } from "react-router-dom";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 20px;
  position: relative;
`;

const Logo = styled.h1`
  margin: 0;
`;

const SearchCon = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  margin-left: 1rem;
  position: relative;
  input {
    border: none;
    outline: none;
    padding: 1rem;
    flex: 1;
    width: 400px;
    background-color: #f4f7ff;
  }

  button {
    background-color: #0087ca;
    padding: 0.5rem;
    cursor: pointer;
    img {
      width: 20px;
      height: 20px;
    }
  }
`;

const MyPage = styled(Link)`
  display: flex;
  align-items: center;
  margin-left: auto;
  img {
    width: 46px;
    height: 46px;
    margin-right: 0.5rem;
  }
`;
const SearchResult = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #f4f7ff;
  padding: 0%.5;
  width: 90%;
  z-index: 1;
  max-height: 300px;
  overflow-y: auto;
`;
const NoSearchResult = styled.p`
  padding: 8px 16px;
  text-align: center;
`;

const ResultItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
  &:last-child {
    border-bottom: none;
  }

  .label {
    width: 70px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-right: 1rem;
    font-size: 12px;
    color: #fff;
    font-weight: bold;
  }

  .label.red {
    background-color: #dd1f3d;
  }

  .label.orange {
    background-color: #ff8040;
  }

  .label.yellow {
    background-color: #ffb100;
  }

  .label.green {
    background-color: #00d369;
  }

  .name {
    flex: 1;
  }
`;

export default function Header() {
  const { isLoggedIn, openLoginModal } = userStore();
  const { data, isLoading } = UseFetchData();
  const [query, setQuery] = useState("");
  const { setClickedMarkerName } = usePlaceMarkerStore();
  const navigate = useNavigate();

  /*검색어 필터링*/
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
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

  const handleSearch = () => {
    if (
      filteredData.some(
        (item) => item.name.toLowerCase() === query.toLowerCase()
      )
    ) {
      setClickedMarkerName(query);
      setQuery("");
      navigate("/");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <StyledHeader className="box-shadow">
      <Logo>
        <Link to="/">
          <img src="/img/logo.svg" alt="로고" />
        </Link>
      </Logo>
      <nav style={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
        <SearchCon>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="주요장소를 검색해보세요."
            className="border-radius-thin"
          />
          {query && (
            <SearchResult className="box-shadow border-radius-thin">
              {isLoading ? (
                <p>Loading...</p>
              ) : filteredData.length === 0 ? (
                <NoSearchResult>검색 결과가 없습니다.</NoSearchResult>
              ) : (
                filteredData.map((item, index) => (
                  <ResultItem key={index}>
                    <div
                      className={`label ${getLabelClass(
                        item.congest
                      )} border-radius-default `}
                    >
                      {item.congest}
                    </div>
                    <div className="name">{item.name}</div>
                  </ResultItem>
                ))
              )}
            </SearchResult>
          )}
          <button className="border-radius-thin" onClick={handleSearch}>
            <img src="/img/search.svg" alt="검색" />
          </button>
        </SearchCon>
        <MyPage
          to={isLoggedIn ? "/mypage" : "#"}
          onClick={!isLoggedIn ? openLoginModal : null}
        >
          <img src="/img/mypage.svg" alt="마이페이지 버튼" />
          <h3>MY</h3>
        </MyPage>
      </nav>
    </StyledHeader>
  );
}
