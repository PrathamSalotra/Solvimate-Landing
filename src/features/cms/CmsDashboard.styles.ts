import styled from "styled-components";

/* ── Page Container ── */
export const PageContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

/* ── Tab Bar ── */
export const TabsContainer = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 24px;
  background: rgba(0, 0, 0, 0.2);
  padding: 4px;
  border-radius: 10px;
  width: fit-content;
`;

export const TabButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: ${(props) => (props.$active ? "var(--lime)" : "transparent")};
  color: ${(props) => (props.$active ? "var(--ink)" : "var(--mist)")};
  border: none;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: ${(props) => (props.$active ? "700" : "500")};
  font-family: var(--font-body);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    color: ${(props) => (props.$active ? "var(--ink)" : "var(--foreground)")};
    background: ${(props) => (props.$active ? "var(--lime)" : "rgba(255, 255, 255, 0.05)")};
  }
`;

export const TabCount = styled.span<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 10px;
  font-size: 0.7rem;
  font-weight: 700;
  font-family: var(--font-mono);
  background: ${(props) => (props.$active ? "rgba(0, 30, 43, 0.2)" : "rgba(255, 255, 255, 0.08)")};
  color: ${(props) => (props.$active ? "var(--ink)" : "var(--mist)")};
`;

/* ── Section Card ── */
export const SectionCard = styled.section`
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  background: var(--surface);
  padding: 24px;

  @media (max-width: 580px) {
    padding: 16px;
  }
`;

export const SectionHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const SectionTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--lime);
    box-shadow: 0 0 8px var(--lime);
    flex-shrink: 0;
  }
`;

export const SectionTitle = styled.h2`
  margin: 0;
  color: var(--foreground);
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 600;
`;

export const SectionSubtitle = styled.span`
  display: block;
  font-size: 0.65rem;
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--mist);
  margin-top: 2px;
`;

/* ── Add Button ── */
export const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  background: var(--lime);
  color: var(--ink);
  border: none;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 700;
  font-family: var(--font-body);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }
`;

/* ── Data Table ── */
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
  }

  td {
    color: var(--foreground);
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

/* ── Status Badge ── */
export const StatusBadgeButton = styled.button<{ $isActive: boolean }>`
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
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }

  ${(props) =>
    props.$isActive
      ? `
        color: var(--lime);
        background: rgba(190, 254, 115, 0.08);
        border: 1px solid rgba(190, 254, 115, 0.2);

        .dot {
          background-color: var(--lime);
        }
      `
      : `
        color: var(--mist);
        background: rgba(159, 184, 180, 0.08);
        border: 1px solid rgba(159, 184, 180, 0.2);

        .dot {
          background-color: var(--mist);
        }
      `}

  &:hover {
    filter: brightness(1.15);
  }
`;

/* ── Delete Button ── */
export const DeleteButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: var(--mist);
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s ease;

  svg {
    width: 14px;
    height: 14px;
  }

  &:hover {
    color: #ff7070;
    background: rgba(255, 112, 112, 0.08);
  }
`;

/* ── Empty / Loading State ── */
export const EmptyState = styled.td`
  color: var(--mist) !important;
  font-size: 0.85rem;
  text-align: center !important;
  padding: 32px 16px !important;
`;
