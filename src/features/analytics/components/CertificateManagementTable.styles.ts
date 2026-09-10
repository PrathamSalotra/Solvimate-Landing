import styled from "styled-components";

export const SectionCard = styled.section`
  border: 1px solid rgba(55, 251, 137, 0.2);
  border-radius: 16px;
  background: linear-gradient(170deg, rgba(1, 55, 51, 0.9), rgba(0, 30, 43, 0.95));
  padding: 24px;
  margin-top: 24px;
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`;

export const TitleBlock = styled.div`
  h2 {
    margin: 0 0 8px;
    color: #ffffff;
    font-size: 1.1rem;
  }
  p {
    margin: 0;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.85rem;
    max-width: 500px;
  }
`;

export const SearchInput = styled.input`
  min-width: 280px;
  padding: 10px 14px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  color: #ffffff;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: rgba(55, 251, 137, 0.6);
    background: rgba(0, 0, 0, 0.4);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

export const TableWrap = styled.div`
  overflow-x: auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.15);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;

  th,
  td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  th {
    color: rgba(255, 255, 255, 0.6);
    font-weight: 500;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.5px;
    background: rgba(255, 255, 255, 0.03);
    white-space: nowrap;
  }

  td {
    color: #ffffff;
    vertical-align: middle;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tbody tr:hover {
    background: rgba(255, 255, 255, 0.02);
  }
`;

export const EmptyState = styled.p`
  padding: 32px;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
`;

export const MetricBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(55, 251, 137, 0.1);
  color: #37fb89;
  padding: 4px 10px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.75rem;
`;

export const StatusBadge = styled.span<{ $variant: "active" | "revoked" }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  white-space: nowrap;

  ${(props) =>
    props.$variant === "active"
      ? `
        color: #37fb89;
        background: rgba(55, 251, 137, 0.12);
        border: 1px solid rgba(55, 251, 137, 0.3);
      `
      : `
        color: #ff7070;
        background: rgba(255, 112, 112, 0.12);
        border: 1px solid rgba(255, 112, 112, 0.3);
      `}
`;

export const ToggleButton = styled.button<{ $isRevoked: boolean }>`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(0, 0, 0, 0.2);
  color: #ffffff;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${(props) => (props.$isRevoked ? "rgba(55, 251, 137, 0.2)" : "rgba(255, 112, 112, 0.2)")};
    border-color: ${(props) => (props.$isRevoked ? "rgba(55, 251, 137, 0.4)" : "rgba(255, 112, 112, 0.4)")};
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
  padding: 0 8px;

  p {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.85rem;
    margin: 0;
  }

  div {
    display: flex;
    gap: 8px;
  }
`;

export const PageButton = styled.button`
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(0, 0, 0, 0.2);
  color: #ffffff;
  font-size: 0.85rem;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
