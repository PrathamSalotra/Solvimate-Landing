import styled from "styled-components";

export const SectionCard = styled.section`
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  background: var(--surface);
  padding: 20px;
  display: flex;
  flex-direction: column;

  @media (max-width: 580px) {
    border-radius: 10px;
    padding: 16px;
  }
`;

export const SectionTitle = styled.h2`
  margin: 0;
  color: var(--foreground);
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: -0.2px;
`;

export const SectionSubtext = styled.p`
  margin: 4px 0 0;
  color: var(--mist);
  font-size: 0.85rem;
`;

export const EmptyState = styled.p`
  margin: 8px 0 0;
  color: rgba(255, 255, 255, 0.64);
  font-size: 0.82rem;
`;

export const BarList = styled.div`
  margin-top: 10px;
  display: grid;
  gap: 10px;
`;

export const BarRow = styled.article`
  display: grid;
  gap: 6px;
`;

export const BarLabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;

  p {
    margin: 0;
    color: var(--mist);
    font-size: 0.85rem;
    font-family: var(--font-mono);
  }
`;

export const BarTrack = styled.div`
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  height: 6px;
  overflow: hidden;
`;

export const BarFill = styled.div<{ width: string }>`
  height: 100%;
  border-radius: 999px;
  background: var(--lime);
  width: ${(props) => props.width};
`;
