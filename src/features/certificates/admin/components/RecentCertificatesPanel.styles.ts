import styled from "styled-components";

export const SectionCard = styled.section`
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  background: var(--surface);
  padding: 24px;
  margin-bottom: 16px;

  @media (max-width: 580px) {
    padding: 16px;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const TitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  color: var(--foreground);
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--lime);
    box-shadow: 0 0 8px var(--lime);
  }
`;

export const EmptyState = styled.p`
  color: var(--mist);
  opacity: 0.6;
  font-size: 0.85rem;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 24px;
`;

export const StatCard = styled.div`
  background: var(--surface-alt);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: center;

  span {
    color: var(--mist);
    font-size: 0.65rem;
    font-family: var(--font-mono);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  strong {
    color: var(--foreground);
    font-size: 1.2rem;
    font-weight: 600;
  }

  strong.mint {
    color: var(--lime);
  }
`;

export const SearchWrap = styled.div`
  position: relative;
  margin-bottom: 16px;

  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--mist);
  }

  input {
    width: 100%;
    padding: 10px 10px 10px 36px;
    background: transparent;
    border: none;
    border-bottom: 1px solid var(--border);
    color: var(--foreground);
    font-size: 0.85rem;

    &:focus {
      outline: none;
      border-color: var(--lime);
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
  font-size: 0.8rem;

  th,
  td {
    padding: 12px 8px;
    text-align: left;
    border-bottom: 1px solid var(--border-subtle);
  }

  th {
    color: var(--mist);
    font-family: var(--font-mono);
    font-weight: 500;
    text-transform: uppercase;
    font-size: 0.65rem;
    letter-spacing: 0.5px;
  }

  td {
    color: var(--foreground);
  }


  tr:last-child td {
    border-bottom: none;
  }

  tbody tr:hover {
    background: var(--surface-hover);
  }
`;

export const StatusBadge = styled.span<{ $variant: "active" | "revoked" }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.65rem;
  font-weight: 700;
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--lime);

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--lime);
  }
`;

export const TableFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  font-size: 0.75rem;
  color: var(--mist);

  a {
    color: var(--foreground);
    text-decoration: none;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 4px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const PerimeterCard = styled.div`
  background: var(--surface-hover);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;

  svg {
    color: var(--mist);
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  span.label {
    font-size: 0.65rem;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--foreground);
    letter-spacing: 0.5px;
  }

  span.desc {
    font-size: 0.65rem;
    font-family: var(--font-mono);
    color: var(--mist);
  }
`;
