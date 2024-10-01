import styled from "styled-components";

const ListCon = styled.div`
  display: flex;
  margin: 1rem;
  border: 1px solid #ccc;
  position: relative;
  padding: 1rem;
  height: 270px;
`;
const Thumbnail = styled.img`
  width: 210px;
  height: 205px;
  min-width: 210px;
  min-height: 205px;
  object-fit: cover;
  overflow: hidden;
`;
const ListContents = styled.div`
  padding: 1rem;
  img {
    margin-right: 0.5rem;
  }
`;

const AddBtn = styled.button`
  display: flex;
  position: absolute;
  bottom: 5px;
  right: 0;
`;
export default function CultureList({ thumbnail, name, place, period, url }) {
  return (
    <ListCon className="border-radius-default ">
      <Thumbnail src={thumbnail} alt="" />
      <ListContents>
        <h3>{name}</h3>
        <p className="font-weight-regular">
          <img src="/img/ListSpotMark.svg" alt="" />
          {place}
        </p>
        <p className="font-weight-regular">
          <img src="/img/CultureDay.svg" alt="" />
          {period}
        </p>
        <AddBtn
          onClick={() => {
            window.open(url);
          }}
        >
          자세히보기
          <img src="/img/CultureAdd.svg" alt="" />
        </AddBtn>
      </ListContents>
    </ListCon>
  );
}
