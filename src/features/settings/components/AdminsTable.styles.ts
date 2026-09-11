import styled from "styled-components";

export const SectionCard = styled.section`
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  background: var(--surface);
  padding: 24px;
  margin-bottom: 24px;

  @media (max-width: 580px) {
    padding: 16px;
  }
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
    color: var(--foreground);
    font-size: 1.1rem;
  }
  p {
    margin: 0;
    color: var(--mist);
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
  background: var(--surface-alt);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--foreground);
  font-size: 0.85rem;
  transition: all 0.2s ease;
  min-width: 240px;

  &:focus {
    outline: none;
    border-color: var(--lime);
    background: var(--surface-alt);
  }

  &::placeholder {
    color: var(--mist);
    opacity: 0.5;
  }

  @media (max-width: 600px) {
    min-width: unset;
  }
`;

export const InviteButton = styled.button`
  padding: 10px 20px;
  background: var(--lime);
  color: var(--ink);
  border: none;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const TableWrap = styled.div`
  overflow-x: auto;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface-alt);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
  min-width: 550px;

  th,
  td {
    padding: 14px 16px;
    text-align: left;
    border-bottom: 1px solid var(--border-subtle);
  }

  th {
    color: var(--mist);
    font-weight: 500;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.5px;
    background: var(--surface-hover);
    white-space: nowrap;
  }

  td {
    color: var(--foreground);
    vertical-align: middle;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tbody tr:hover {
    background: var(--surface-hover);
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
  background: color-mix(in srgb, var(--lime) 15%, transparent);
  color: var(--lime);
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const RoleSelect = styled.select`
  padding: 6px 12px;
  background: var(--surface-alt);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--foreground);
  font-size: 0.8rem;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
    border-color: var(--lime);
  }

  option {
    background: var(--surface);
    color: var(--foreground);
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
        color: var(--lime);
        background: color-mix(in srgb, var(--lime) 12%, transparent);
        border: 1px solid color-mix(in srgb, var(--lime) 30%, transparent);
      `
      : `
        color: #ff7070;
        background: color-mix(in srgb, #ff7070 12%, transparent);
        border: 1px solid color-mix(in srgb, #ff7070 30%, transparent);
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
  color: var(--mist);
  font-size: 0.8rem;
`;

export const EmptyState = styled.p`
  padding: 32px;
  text-align: center;
  color: var(--mist);
  margin: 0;
  background: var(--surface-alt);
  border-radius: 8px;
  border: 1px solid var(--border-subtle);
`;
