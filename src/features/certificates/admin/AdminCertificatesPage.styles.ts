import styled from "styled-components";
import { motion } from "framer-motion";

export const PageContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
`;

export const Header = styled(motion.header)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  gap: 20px;
  flex-wrap: wrap;

  h1 {
    margin: 12px 0 8px;
    color: var(--foreground);
    font-family: var(--font-display);
    font-size: 2.2rem;
    font-weight: 600;
    letter-spacing: -0.5px;
  }

  p {
    margin: 0;
    color: var(--mist);
    font-size: 0.95rem;
    max-width: 600px;
    line-height: 1.5;
  }
`;

export const Eyebrow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--mist);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-weight: 600;

  span {
    color: var(--mint);
  }

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--mint);
    box-shadow: 0 0 6px var(--mint);
  }
`;

export const HeaderPills = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const HeaderPill = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);

  svg {
    color: var(--mist);
  }

  div {
    display: flex;
    flex-direction: column;
    
    span.label {
      font-size: 0.65rem;
      text-transform: uppercase;
      font-family: var(--font-mono);
      color: var(--mist);
      letter-spacing: 0.5px;
    }

    span.value {
      font-size: 0.85rem;
      font-family: var(--font-mono);
      font-weight: 600;
      color: var(--foreground);
    }
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.8fr) minmax(0, 1.1fr);
  gap: 24px;
  align-items: start;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 24px;

  @media (max-width: 1100px) {
    position: static;
  }
`;
