import styled from "styled-components";

export const PageContainer = styled.main`
  min-height: 100vh;
  padding: 28px 16px 40px;
  background: var(--background);

  @media (max-width: 580px) {
    padding: 16px 10px 30px;
  }
`;

export const LayoutGrid = styled.div`
  width: min(1200px, 100%);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr);
  gap: 16px;

  @media (max-width: 1020px) {
    grid-template-columns: 1fr;
  }
`;

export const MainContent = styled.section`
  display: grid;
  gap: 14px;
`;
