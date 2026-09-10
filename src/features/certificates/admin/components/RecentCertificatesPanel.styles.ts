import styled from "styled-components";

export const SectionCard = styled.section`
  border: 1px solid rgba(55, 251, 137, 0.2);
  border-radius: 16px;
  background: linear-gradient(170deg, rgba(1, 55, 51, 0.9), rgba(0, 30, 43, 0.95));
  padding: 24px;
  margin-bottom: 24px;

  @media (max-width: 580px) {
    padding: 16px;
  }
`;

export const SectionTitle = styled.h2`
  margin: 0 0 8px;
  color: #ffffff;
  font-size: 1.1rem;
`;

export const SectionDescription = styled.p`
  margin: 0 0 20px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  line-height: 1.5;
`;

export const EmptyState = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
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
  }

  td {
    color: #ffffff;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tbody tr:hover {
    background: rgba(255, 255, 255, 0.02);
  }
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
