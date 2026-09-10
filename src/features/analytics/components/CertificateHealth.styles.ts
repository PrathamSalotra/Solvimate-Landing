import styled from "styled-components";

export const SectionCard = styled.section`
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  background: var(--surface);
  padding: 24px;
  margin-bottom: 24px;

  @media (max-width: 580px) {
    padding: 16px;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 4px;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  color: var(--foreground);
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 600;
`;

export const SectionSubtext = styled.p`
  margin: 0 0 24px;
  color: var(--mist);
  font-size: 0.85rem;
  line-height: 1.5;
  max-width: 600px;
`;

export const StatusGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StatusRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StatusLabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .label-group {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .dot.lime { background-color: var(--lime); }
  .dot.red { background-color: #ff7070; }
  .dot.blue { background-color: var(--lime); }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: var(--foreground);
    font-weight: 500;
  }

  span.value {
    font-weight: 700;
    color: var(--foreground);
    font-size: 0.9rem;
  }

  span.pct {
    color: var(--mist);
    font-size: 0.8rem;
    font-family: var(--font-mono);
  }
`;

export const StatusTrack = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
  overflow: hidden;
`;

export const StatusFill = styled.div<{ $color?: string }>`
  height: 100%;
  background: ${(props) => props.$color || "var(--lime)"};
  border-radius: 3px;
  transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
`;
