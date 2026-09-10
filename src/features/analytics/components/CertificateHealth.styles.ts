import styled from "styled-components";

export const SectionCard = styled.section`
  border: 1px solid rgba(55, 251, 137, 0.2);
  border-radius: 16px;
  background: linear-gradient(170deg, rgba(1, 55, 51, 0.9), rgba(0, 30, 43, 0.95));
  padding: 24px;
  height: 100%;
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

export const StatusGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StatusRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StatusLabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    margin: 0;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.85);
  }

  p:last-child {
    font-weight: 600;
    color: #ffffff;
  }
`;

export const StatusTrack = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  overflow: hidden;
`;

export const StatusFillActive = styled.div`
  height: 100%;
  background: #37fb89;
  border-radius: 4px;
  transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
`;

export const StatusFillRevoked = styled.div`
  height: 100%;
  background: #ff7070;
  border-radius: 4px;
  transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
`;

export const StatusFillNeutral = styled.div`
  height: 100%;
  background: #3ba1ff;
  border-radius: 4px;
  transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
`;
