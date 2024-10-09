import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UseFetchData from "../../hooks/useFetchData";
import usePlaceMarkerStore from "../../store/clickPlaceMarkerStore";
import useDebounce from "../../hooks/useDebounce";
import SearchResults from "./SearchResults";
import * as S from "../../assets/layout.styled/Header.styled";

export default function SearchBar() {
  const { data, isLoading } = UseFetchData();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const { setClickedMarkerName } = usePlaceMarkerStore();
  const navigate = useNavigate();

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

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
        <SearchResults
          isLoading={isLoading}
          filteredData={filteredData}
          onResultClick={handleResultClick}
        />
      )}
      <button className="border-radius-thin" onClick={handleSearch}>
        <img src="/img/search.svg" alt="검색" />
      </button>
    </S.SearchCon>
  );
}
