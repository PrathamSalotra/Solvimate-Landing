import styled from "styled-components";

export const SectionCard = styled.section`
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  background: var(--surface);
  padding: 24px;

  @media (max-width: 580px) {
    padding: 16px;
  }
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`;

export const TitleBlock = styled.div`
  h2 {
    margin: 0 0 6px;
    color: var(--foreground);
    font-family: var(--font-display);
    font-size: 1.2rem;
    font-weight: 600;
  }
  p {
    margin: 0;
    color: var(--mist);
    font-size: 0.85rem;
    max-width: 550px;
    line-height: 1.5;
  }
`;

export const SearchWrap = styled.div`
  position: relative;
  min-width: 280px;

  svg {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--mist);
  }

  input {
    width: 100%;
    padding: 10px 14px 10px 40px;
    background: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: var(--foreground);
    font-size: 0.85rem;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: rgba(255, 255, 255, 0.3);
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }
  }
`;

export const TableWrap = styled.div`
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;

  th,
  td {
    padding: 14px 12px;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  th {
    color: var(--mist);
    font-family: var(--font-mono);
    font-weight: 500;
    text-transform: uppercase;
    font-size: 0.7rem;
    letter-spacing: 0.5px;
    white-space: nowrap;
  }

  td {
    color: var(--foreground);
    vertical-align: middle;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tbody tr {
    transition: background 0.15s ease;
  }

  tbody tr:hover {
    background: rgba(255, 255, 255, 0.02);
  }
`;

export const EmptyState = styled.p`
  padding: 32px;
  text-align: center;
  color: var(--mist);
  margin: 0;
`;

export const MetricBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--lime);
  font-weight: 700;
  font-size: 0.85rem;
  font-family: var(--font-mono);
`;

export const StatusBadge = styled.span<{ $variant: "active" | "revoked" }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.3px;
  white-space: nowrap;

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }

  ${(props) =>
    props.$variant === "active"
      ? `
        color: var(--lime);
        background: rgba(190, 254, 115, 0.08);
        border: 1px solid rgba(190, 254, 115, 0.2);

        .dot {
          background-color: var(--lime);
        }
      `
      : `
        color: #ff7070;
        background: rgba(255, 112, 112, 0.08);
        border: 1px solid rgba(255, 112, 112, 0.2);

        .dot {
          background-color: #ff7070;
        }
      `}
`;

export const ToggleButton = styled.button<{ $isRevoked: boolean }>`
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.2);
  color: var(--foreground);
  font-family: var(--font-body);
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);

  p {
    color: var(--mist);
    font-size: 0.8rem;
    font-family: var(--font-mono);
    margin: 0;

    strong {
      color: var(--foreground);
    }
  }

  div {
    display: flex;
    gap: 8px;
  }
`;

export const PageButton = styled.button`
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: transparent;
  color: var(--foreground);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.05);
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
    color: var(--mist);
  }
`;
