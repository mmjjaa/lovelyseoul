import styled from "styled-components";
const Button = styled.button`
  border: 1px solid #ccc;
  border-radius: 10px;
  outline: none;
  background-color: transparent;
  display: flex;
  cursor: pointer;
  width: 120px;
  padding: 10px;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 16px;
  font-weight: 300;
  img {
    margin-right: 5px;
  }
`;
export default function CurrentLocationBtn() {
  return (
    <Button>
      <img src="/img/CurrentLocation.svg" alt="" />
      현재 장소
    </Button>
  );
}
