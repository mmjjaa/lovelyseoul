import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  padding: 1rem;
  box-shadow: 0 4px 4px -5px;
  margin-bottom: 20px;
`;

const Logo = styled.h1`
  margin: 0;
`;

const SearchCon = styled.div`
  display: flex;
  align-items: center;
  /* border: 1px solid #ccc; */
  border-radius: 20px;
  padding: 0.5rem;
  margin-left: 1rem;

  input {
    border: none;
    outline: none;
    padding: 1rem;
    flex: 1;
    width: 400px;
    background-color: #f4f7ff;
    border-radius: 10px;
  }

  button {
    background-color: #0087ca;
    border: none;
    padding: 0.5rem;
    border-radius: 10px;
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

export default function Header({ onMyPageClick }) {
  return (
    <StyledHeader>
      <Logo>
        <Link to="/">
          <img src="/img/logo.svg" alt="로고" />
        </Link>
      </Logo>
      <nav style={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
        <SearchCon>
          <input type="text" />
          <button>
            <img src="/img/search.svg" alt="검색" />
          </button>
        </SearchCon>
        <MyPage to="/mypage" onClick={onMyPageClick}>
          <img src="/img/mypage.svg" alt="마이페이지 버튼" />
          MY
        </MyPage>
      </nav>
    </StyledHeader>
  );
}
