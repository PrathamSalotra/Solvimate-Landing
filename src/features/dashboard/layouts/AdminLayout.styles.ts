import styled from "styled-components";

export const PageContainer = styled.main`
  min-height: 100vh;
  padding: 28px 16px 40px;
  background: var(--background);
  font-family: "Inter Tight", "Inter Tight Fallback", "Inter Tight", -apple-system, sans-serif, "Inter Tight", "Inter Tight Fallback", "Inter Tight", sans-serif;

  --font-body: "Inter Tight", "Inter Tight Fallback", "Inter Tight", -apple-system, sans-serif, "Inter Tight", "Inter Tight Fallback", "Inter Tight", sans-serif;
  --font-display: "Inter Tight", "Inter Tight Fallback", "Inter Tight", -apple-system, sans-serif, "Inter Tight", "Inter Tight Fallback", "Inter Tight", sans-serif;
  --font-mono: "Inter Tight", "Inter Tight Fallback", "Inter Tight", -apple-system, sans-serif, "Inter Tight", "Inter Tight Fallback", "Inter Tight", sans-serif;

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

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const MainContent = styled.section`
  display: grid;
  gap: 14px;
`;
