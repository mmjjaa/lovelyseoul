import * as S from "../../assets/layout.styled/Header.styled";

export default function SearchResults({
  isLoading,
  filteredData,
  onResultClick,
}) {
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

  return (
    <S.SearchResult className="box-shadow border-radius-thin">
      {isLoading ? (
        <p>Loading...</p>
      ) : filteredData.length === 0 ? (
        <S.NoSearchResult>검색 결과가 없습니다.</S.NoSearchResult>
      ) : (
        filteredData.map((item, index) => (
          <S.ResultItem key={index} onClick={() => onResultClick(item.name)}>
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
  );
}
