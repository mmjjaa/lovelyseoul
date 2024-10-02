import styled from "styled-components";
import media from "../../utils/media";

export const StyledKakaoMap = styled.div`
  width: 60%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  ${media("tablet")`
    width: 100%;
    height: 50vh;
    flex-grow: 1;
  `}
`;

export const ZoomControls = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  flex-direction: row;
  z-index: 10;
`;

export const ZoomButton = styled.button`
  margin: 5px;
  padding: 10px;
`;
