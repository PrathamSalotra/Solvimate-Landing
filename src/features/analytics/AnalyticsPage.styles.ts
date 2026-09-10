import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
`;

export const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;
