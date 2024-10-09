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
    height: 50vh;
    flex-grow: 1;
  `}
`;
export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const MypageText = styled.h2`
  padding: 0 1rem;
`;
export const MypageTitle = styled(MypageText).attrs({ as: "h2" })`
  ${media("phone")`
    font-size: 1.2rem;
  `}

  ${media("tablet")`
    font-size: 1.4rem;
  `}
`;
export const MypageSubtitle = styled(MypageText).attrs({ as: "p" })`
  ${media("phone")`
    font-size: 0.9rem;
  `}

  ${media("tablet")`
    font-size: 1rem;
  `}
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding-top: 200px;
  h2 {
    color: #999;

    ${media("phone")`
      font-size: 1.2rem;
    `}

    ${media("tablet")`
      font-size: 1.4rem;
    `}
  }
  strong {
    color: #eb5050;
  }
  ${media("phone")`
    padding-top: 100px;
  `}

  ${media("tablet")`
    padding-top: 150px;
  `}
`;
export const button = styled.button`
  background-color: rgba(251, 159, 54, 0.7);
  color: white;
  width: 100px;
  border-radius: 5px;
  margin: 1rem;
  padding: 0.5rem;
  &:hover {
    background-color: rgba(251, 159, 54, 1);
  }
`;
