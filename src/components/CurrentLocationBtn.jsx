import styled from "styled-components";
const Button = styled.button`
  border: 1px solid #ccc;
  display: flex;
  cursor: pointer;
  width: 120px;
  padding: 10px;
  img {
    margin-right: 5px;
  }
`;
export default function CurrentLocationBtn() {
  return (
    <Button className="border-radius-thin ">
      <img src="/img/CurrentLocation.svg" alt="" />
      <p>현재 장소</p>
    </Button>
  );
}
