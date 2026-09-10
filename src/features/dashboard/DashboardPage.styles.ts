import styled from "styled-components";

export const TwoColumn = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 1020px) {
    grid-template-columns: 1fr;
  }
`;
