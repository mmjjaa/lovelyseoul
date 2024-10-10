import styled from "styled-components";
const Button = styled.button`
  border: 1px solid #ccc;
  display: flex;
  width: 150px;
  padding: 10px;
  img {
    margin-right: 5px;
  }
`;

export default function CulturalEventsBtn() {
  return (
    <Button className="border-radius-thin">
      <img src="/img/CulturalEvents.svg" alt="" />
      <p>주변 문화 행사</p>
    </Button>
  );
}
