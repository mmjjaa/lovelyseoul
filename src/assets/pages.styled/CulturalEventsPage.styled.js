import styled from "styled-components";
import media from "../../utils/media";

export const Main = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
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
  overflow-y: auto;
  ${media("tablet")`
    width: 100%;
    max-width: 100%;
    
  `}
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
export const EventsText = styled.h2`
  padding: 0 1rem;
`;
export const EventsTitle = styled(EventsText).attrs({ as: "h2" })`
  ${media("tablet")`
  font-size: 1.4rem; 
`}

  ${media("phone")`
  font-size: 1.2rem; 
`}
`;
export const EventsSubtitle = styled(EventsText).attrs({ as: "p" })`
  ${media("tablet")`
  font-size: 1rem; 
`}

  ${media("phone")`
  font-size: 0.9rem; 
`}
`;

export const NoEventMessage = styled.div`
  text-align: center;
  padding-top: 200px;
  p {
    padding: 1rem;
  }
  ${media("phone")`
    padding-top: 100px;
  `}

  ${media("tablet")`
    padding-top: 150px;
  `}
`;
export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
