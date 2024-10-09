import BounceLoader from "react-spinners/BounceLoader";
import styled from "styled-components";
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
export default function Loading({ isLoading }) {
  return (
    <LoaderContainer>
      <BounceLoader color="#0087CA" loading={isLoading} size={60} />
    </LoaderContainer>
  );
}
