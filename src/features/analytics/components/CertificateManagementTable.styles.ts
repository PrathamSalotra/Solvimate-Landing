import styled from "styled-components";

export const SectionCard = styled.section`
  border: 1px solid var(--border-subtle);
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
    background: var(--surface-alt);
    border: 1px solid var(--border);
    border-radius: 8px;
    color: var(--foreground);
    font-size: 0.85rem;
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: var(--mist);
    }

    &::placeholder {
      color: var(--mist);
      opacity: 0.5;
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
    border-bottom: 1px solid var(--border-subtle);
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
    background: var(--surface-hover);
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
        background: color-mix(in srgb, var(--lime) 8%, transparent);
        border: 1px solid color-mix(in srgb, var(--lime) 20%, transparent);

        .dot {
          background-color: var(--lime);
        }
      `
      : `
        color: #ff7070;
        background: color-mix(in srgb, #ff7070 8%, transparent);
        border: 1px solid color-mix(in srgb, #ff7070 20%, transparent);

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
  border: 1px solid var(--border);
  background: var(--surface-alt);
  color: var(--foreground);
  font-family: var(--font-body);
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: var(--surface-hover);
    border-color: var(--mist);
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
  border-top: 1px solid var(--border-subtle);

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
  border: 1px solid var(--border);
  background: transparent;
  color: var(--foreground);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: var(--surface-hover);
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
    color: var(--mist);
  }
`;
