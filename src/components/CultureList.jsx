import styled from "styled-components";

const ListCon = styled.div`
  display: flex;
  margin: 1rem;
  border: 1px solid #ccc;
  position: relative;
  padding: 1rem;
`;
const Thumbnail = styled.img`
  width: 210px;
  object-fit: cover;
`;
const ListContents = styled.div`
  padding: 1rem;
`;

const AddBtn = styled.button`
  cursor: pointer;
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
        <p>
          <img src="/img/ListSpotMark.svg" alt="" />
          {place}
        </p>
        <p>
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
