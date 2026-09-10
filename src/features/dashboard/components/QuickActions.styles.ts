import styled from "styled-components";
import Link from "next/link";

export const SectionCard = styled.section`
  border: 1px solid rgba(55, 251, 137, 0.2);
  border-radius: 16px;
  background: linear-gradient(170deg, rgba(1, 55, 51, 0.9), rgba(0, 30, 43, 0.95));
  padding: 14px;

  @media (max-width: 580px) {
    border-radius: 14px;
  }
`;

export const SectionTitle = styled.h2`
  margin: 0;
  color: #ffffff;
  font-size: 1rem;
`;

export const SectionSubtext = styled.p`
  margin: 6px 0 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.82rem;
`;

export const ActionsGrid = styled.div`
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;

  @media (max-width: 1020px) {
    grid-template-columns: 1fr;
  }
`;

export const ActionCard = styled.article`
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.14);
  padding: 11px;
  display: grid;
  gap: 8px;
`;

export const ActionLabel = styled.h3`
  margin: 0;
  color: #ffffff;
  font-size: 0.88rem;
`;

export const ActionText = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.45;
  font-size: 0.8rem;
`;

export const ActionButton = styled(Link)`
  justify-self: start;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 0.78rem;
  font-weight: 700;
  border: 1px solid rgba(55, 251, 137, 0.45);
  color: #ffffff;
  text-decoration: none;
  background: linear-gradient(140deg, #00684b, #013733);
`;

export const ActionButtonMuted = styled.span`
  justify-self: start;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 0.78rem;
  font-weight: 700;
  border: 1px dashed rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.64);
`;
