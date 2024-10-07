import styled from "styled-components";
import media from "../../utils/media";

export const StyledSpotList = styled.div`
  box-shadow: 0 4px 8px #0003;
  padding: 1rem;
  max-width: 700px;
  min-width: 500px;
  margin: 1rem;
`;

export const ListCon = styled.div`
  display: flex;
  position: relative;
  padding: 1rem;
  cursor: pointer;
  ${media("tablet")`
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;
    `}
`;

export const SpotImg = styled.img`
  width: 150px;
  height: auto;
  object-fit: cover;
`;

export const HeartImg = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

export const ListContents = styled.div`
  flex: 1;
  padding-left: 1rem;

  p {
    margin: 0.5rem 0;
  }
`;

export const IconText = styled.p`
  display: inline-flex;
  align-items: center;
  margin-right: 1rem;
  img {
    margin-right: 0.5rem;
  }
  span {
    margin-right: 1rem;
  }
`;

export const BtnCon = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const Congestion = styled.div`
  background-color: #ff4d4f;
  color: white;
  padding: 0.5rem 1rem;
`;
export const Popular = styled.div`
  background-color: ${({ $ageGroup }) => $ageGroup || "#ffa940"};
  color: white;
  padding: 0.5rem 1rem;
`;

export const ArrowBtn = styled.button`
  position: absolute;
  margin: 1rem 0;
  left: 50%;
  transform: translateX(-50%);
`;

export const Details = styled.div`
  padding: 1rem;
  max-height: ${({ $isOpen }) => ($isOpen ? "500px" : "0")};
  overflow: hidden;
  transition: max-height 0.4s ease-in-out;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transition: opacity 0.4s ease, max-height 0.4s ease-in-out;
  text-align: center;
`;

export const QuietTime = styled.div`
  padding: 1rem;
  background-color: #eee;
  margin-top: 1rem;
`;

export const AgeBar = styled.div`
  display: flex;
  margin-left: 5rem;
`;

export const AgeItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;

  span {
    width: 10px;
    height: 10px;
    background-color: ${({ color }) => color};
    margin-right: 2px;
  }
  p {
    color: #ccc;
  }
`;
export const CustomTooltip = styled.div`
  background: white;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
`;
