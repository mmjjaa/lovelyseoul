import styled from "styled-components";

const ListCon = styled.div`
  display: flex;
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 20px;
  position: relative;
  padding: 1rem;
`;

const ListContents = styled.div`
  padding: 1rem;
  h3 {
    font-size: 24px;
    font-weight: bold;
    font-family: "Do Hyeon", sans-serif;
  }
`;

const AddBtn = styled.button`
  border: none;
  outline: none;
  background-color: inherit;
  cursor: pointer;
  display: flex;
  position: absolute;
  bottom: 5px;
  right: 0;
`;
export default function CultureList() {
  const url = "https://www.naver.com";
  return (
    <ListCon>
      <img src="/img/SpotMain.svg" alt="" />

      <ListContents>
        <h3>K-FOOD 페스티벌 [넉넉]</h3>
        <p>
          <img src="/img/ListSpotMark.svg" alt="" />
          광화문 광장 옆 세종로공원 (세종로)
        </p>
        <p>
          <img src="/img/CultureDay.svg" alt="" />
          2024-05-29 ~ 2025-05-31
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
