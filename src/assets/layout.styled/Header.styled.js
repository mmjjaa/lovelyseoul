import styled from "styled-components";
import media from "../../utils/media";
import { Link } from "react-router-dom";

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 20px;
  position: relative;

  ${media("tablet")`
    padding: 0.5rem;
  `}

  ${media("phone")`

    align-items: flex-start;
  `}
`;

export const SearchCon = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  margin-left: 1rem;
  position: relative;
  flex: 1;
  input {
    border: none;
    outline: none;
    padding: 1rem;
    flex: 1;
    background-color: #f4f7ff;
    max-width: calc(40% - 170px);
    ${media("tablet")`
      max-width: 70%;
    `}

    ${media("phone")`
      max-width: 100%;
      padding: 0.5rem;
    `}
  }

  button {
    background-color: #0087ca;
    padding: 0.5rem;
    img {
      width: 40px;
      height: 20px;
    }
  }
`;

export const MyPage = styled(Link)`
  display: flex;
  align-items: center;
  margin-left: auto;
  img {
    width: 46px;
    height: 46px;
    margin-right: 0.5rem;
  }
  ${media("phone")`
    margin-left: 0;
    margin-top: 0.5rem;
  `}
`;
export const SearchResult = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #f4f7ff;
  padding: 0%.5;

  width: calc(40% - 170px);
  z-index: 100;
  max-height: 300px;
  overflow-y: auto;
  ${media("tablet")`
    width: 70%;
  `}

  ${media("phone")`
    width: 100%;
  `}
`;
export const NoSearchResult = styled.p`
  padding: 8px 16px;
  text-align: center;
`;

export const ResultItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #ddd;
  &:hover {
    background-color: #d9e1f7;
    cursor: pointer;
  }

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
