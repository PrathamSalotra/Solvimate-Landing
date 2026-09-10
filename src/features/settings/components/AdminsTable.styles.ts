import styled from "styled-components";

export const SectionCard = styled.section`
  border: 1px solid rgba(55, 251, 137, 0.2);
  border-radius: 16px;
  background: linear-gradient(170deg, rgba(1, 55, 51, 0.9), rgba(0, 30, 43, 0.95));
  padding: 24px;
  margin-bottom: 24px;
`;

export const SectionHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.85rem;
    max-width: 500px;
    line-height: 1.5;
  }
`;

export const InviteForm = styled.form`
  display: flex;
  gap: 8px;
  align-items: center;

  @media (max-width: 600px) {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }
`;

export const InviteInput = styled.input`
  padding: 10px 14px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  color: #ffffff;
  font-size: 0.85rem;
  transition: all 0.2s ease;
  min-width: 240px;

  &:focus {
    outline: none;
    border-color: rgba(55, 251, 137, 0.6);
    background: rgba(0, 0, 0, 0.4);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

export const InviteButton = styled.button`
  padding: 10px 20px;
  background: #37fb89;
  color: #013733;
  border: none;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background: #2ce878;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(55, 251, 137, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
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
    padding: 14px 16px;
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

export const EmailCell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  span:first-child {
    font-weight: 500;
  }
`;

export const YouBadge = styled.span`
  background: rgba(55, 251, 137, 0.15);
  color: #37fb89;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const RoleSelect = styled.select`
  padding: 6px 12px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: #ffffff;
  font-size: 0.8rem;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
    border-color: #37fb89;
  }

  option {
    background: #013733;
    color: #ffffff;
  }
`;

export const StatusBadgeButton = styled.button<{ $isActive: boolean }>`
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;

  ${(props) =>
    props.$isActive
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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    filter: brightness(1.2);
  }
`;

export const MutedText = styled.span`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8rem;
`;

export const EmptyState = styled.p`
  padding: 32px;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;
