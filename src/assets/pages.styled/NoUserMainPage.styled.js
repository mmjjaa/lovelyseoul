import styled from "styled-components";
import media from "../../utils/media";

export const Main = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  position: relative;
  ${media("tablet")`
    flex-direction: column;
    height: auto;
  `}
`;

export const SpotListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  max-width: 40%;
  margin: 1rem;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  ${media("tablet")`
    width: 100%;
    max-width: 100%;
    height: 50vh;
  `}
`;
export const TitleContainer = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10;
  padding: 1rem;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
`;

export const BtnCon = styled.div`
  display: flex;
  padding: 1rem;
  gap: 1rem;
  ${media("tablet")`
    padding: 0.5rem; 
    flex-direction: column; 
  `}
`;
export const NoUserMainText = styled.div`
  padding: 0 1rem;
`;
export const NoUserMainTitle = styled(NoUserMainText).attrs({ as: "h2" })`
  ${media("tablet")`
    font-size: 1.4rem; 
  `}

  ${media("phone")`
    font-size: 1.2rem; 
  `}
`;
export const NoUserMainSubtitle = styled(NoUserMainText).attrs({ as: "p" })`
  ${media("tablet")`
  font-size: 1rem; 
`}

  ${media("phone")`
  font-size: 0.9rem; 
`}
`;

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
