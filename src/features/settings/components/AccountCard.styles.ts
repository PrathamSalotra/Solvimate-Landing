import styled from "styled-components";

export const SectionCard = styled.section`
  border: 1px solid rgba(55, 251, 137, 0.2);
  border-radius: 16px;
  background: linear-gradient(170deg, rgba(1, 55, 51, 0.9), rgba(0, 30, 43, 0.95));
  padding: 24px;
  margin-bottom: 24px;
`;

export const SectionTitle = styled.h2`
  margin: 0 0 8px;
  color: #ffffff;
  font-size: 1.1rem;
`;

export const SectionSubtext = styled.p`
  margin: 0 0 24px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  line-height: 1.5;
`;

export const AccountGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

export const AccountItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const AccountLabel = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const AccountValue = styled.p`
  margin: 0;
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 500;
`;
