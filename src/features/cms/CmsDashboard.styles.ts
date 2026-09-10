import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const TabsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 8px;
`;

export const TabButton = styled.button<{ $active: boolean }>`
  padding: 10px 20px;
  background: ${(props) => (props.$active ? "rgba(55, 251, 137, 0.15)" : "transparent")};
  color: ${(props) => (props.$active ? "#37fb89" : "rgba(255, 255, 255, 0.6)")};
  border: 1px solid ${(props) => (props.$active ? "rgba(55, 251, 137, 0.3)" : "transparent")};
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: ${(props) => (props.$active ? "700" : "500")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${(props) => (props.$active ? "#37fb89" : "#ffffff")};
    background: ${(props) => (props.$active ? "rgba(55, 251, 137, 0.15)" : "rgba(255, 255, 255, 0.05)")};
  }
`;

export const SectionCard = styled.section`
  border: 1px solid rgba(55, 251, 137, 0.2);
  border-radius: 16px;
  background: linear-gradient(170deg, rgba(1, 55, 51, 0.9), rgba(0, 30, 43, 0.95));
  padding: 24px;
`;

export const SectionHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  h2 {
    margin: 0;
    color: #ffffff;
    font-size: 1.2rem;
  }
`;

export const PrimaryButton = styled.button`
  padding: 8px 16px;
  background: #37fb89;
  color: #013733;
  border: none;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #2ce878;
    transform: translateY(-1px);
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
`;

export const StatusBadgeButton = styled.button<{ $isActive: boolean }>`
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
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

  &:hover {
    filter: brightness(1.2);
  }
`;
