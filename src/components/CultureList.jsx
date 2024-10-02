import * as S from "../assets/components.styled/CultureList.styled";

export default function CultureList({ thumbnail, name, place, period, url }) {
  return (
    <S.ListCon className="border-radius-default ">
      <S.Thumbnail src={thumbnail} alt="" />
      <S.ListContents>
        <h3>{name}</h3>
        <p className="font-weight-regular">
          <img src="/img/ListSpotMark.svg" alt="" />
          {place}
        </p>
        <p className="font-weight-regular">
          <img src="/img/CultureDay.svg" alt="" />
          {period}
        </p>
        <S.AddBtn
          onClick={() => {
            window.open(url);
          }}
        >
          자세히보기
          <img src="/img/CultureAdd.svg" alt="" />
        </S.AddBtn>
      </S.ListContents>
    </S.ListCon>
  );
}
