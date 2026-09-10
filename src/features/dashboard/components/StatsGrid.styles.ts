import styled from "styled-components";

export const StatsGridContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 1020px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 580px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.article`
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

export const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const StatLabel = styled.p`
  margin: 0;
  color: var(--mist);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-weight: 500;
`;

export const StatIconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--mist);

  &.highlight {
    background: rgba(55, 251, 137, 0.1);
    border-color: rgba(55, 251, 137, 0.3);
    color: var(--mint);
  }
`;

export const StatValue = styled.p`
  margin: 0 0 16px;
  color: var(--foreground);
  font-family: var(--font-display);
  font-size: clamp(2rem, 3vw, 2.5rem);
  font-weight: 600;
  letter-spacing: -1px;
`;

export const StatBarContainer = styled.div`
  height: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  margin-bottom: 12px;
  overflow: hidden;
  position: relative;
`;

export const StatBarFill = styled.div<{ $width: number; $color?: string }>`
  height: 100%;
  width: ${(props) => props.$width}%;
  background: ${(props) => props.$color || "var(--lime)"};
  position: absolute;
  left: 0;
  top: 0;
`;

export const StatFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-top: auto;
`;

export const StatCaption = styled.p`
  margin: 0;
  color: var(--mist);
  font-size: 0.8rem;
`;

export const StatMeta = styled.span`
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--mist);
  text-transform: uppercase;

  &.highlight {
    color: var(--lime);
  }
`;
