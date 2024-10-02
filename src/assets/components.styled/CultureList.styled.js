import styled from "styled-components";
import media from "../../utils/media";

export const ListCon = styled.div`
  display: flex;
  margin: 1rem;
  border: 1px solid #ccc;
  position: relative;
  padding: 1rem;
  height: 270px;
  ${media("tablet")`
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;
     height: auto;
    `}
`;
export const Thumbnail = styled.img`
  width: 210px;
  height: 205px;
  min-width: 210px;
  min-height: 205px;
  object-fit: cover;
  overflow: hidden;
`;
export const ListContents = styled.div`
  padding: 1rem;
  img {
    margin-right: 0.5rem;
  }
`;

export const AddBtn = styled.button`
  display: flex;
  position: absolute;
  bottom: 5px;
  right: 0;
`;
