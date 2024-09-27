import styled from "styled-components";
const Button = styled.button`
  border: 1px solid #ccc;
  border-radius: 10px;
  outline: none;
  background-color: transparent;
  display: flex;
  cursor: pointer;
  width: 150px;
  padding: 10px;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 16px;
  font-weight: 300;
  img {
    margin-right: 5px;
  }
`;

export default function CulturalEventsBtn() {
  return (
    <Button>
      <img src="/img/CulturalEvents.svg" alt="" />
      주변 문화 행사
    </Button>
  );
}
