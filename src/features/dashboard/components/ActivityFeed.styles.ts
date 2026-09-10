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

export const FeedGroup = styled.div`
  margin-top: 16px;
  display: grid;
  gap: 12px;
`;

export const ActionLabel = styled.h3`
  margin: 0;
  color: var(--foreground);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

export const FeedList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 8px;
`;

export const FeedItem = styled.li`
  border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
  padding: 12px 0;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: flex-start;

  &:last-child {
    border-bottom: none;
  }
`;

export const FeedMeta = styled.div`
  display: grid;
  gap: 4px;

  p {
    margin: 0;
    color: var(--mist);
    font-size: 0.85rem;
    
    strong {
      color: var(--foreground);
      font-weight: 500;
    }
  }
`;

export const StatusBadge = styled.span<{ $variant: "active" | "revoked" | "neutral" }>`
  border-radius: 4px;
  padding: 4px 8px;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.5px;
  white-space: nowrap;

  ${(props) =>
    props.$variant === "active" &&
    `
    color: var(--lime);
    background: rgba(190, 254, 114, 0.1);
    border: 1px solid rgba(190, 254, 114, 0.2);
  `}

  ${(props) =>
    props.$variant === "revoked" &&
    `
    color: #ff8a8a;
    background: rgba(255, 112, 112, 0.1);
    border: 1px solid rgba(255, 112, 112, 0.2);
  `}

  ${(props) =>
    props.$variant === "neutral" &&
    `
    color: var(--mist);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
  `}
`;

export const EmptyState = styled.p`
  margin: 8px 0 0;
  color: var(--mist);
  font-size: 0.85rem;
`;
