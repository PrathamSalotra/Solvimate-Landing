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
    margin: 8px 0;
    color: #ffffff;
    font-size: 1.8rem;
    font-weight: 700;
    letter-spacing: -0.5px;
  }

  p {
    margin: 0;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.95rem;
    max-width: 600px;
    line-height: 1.5;
  }
`;

export const Eyebrow = styled.p`
  color: #37fb89 !important;
  font-size: 0.8rem !important;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 4px !important;
`;

export const AdminMeta = styled.div`
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;

  p {
    margin: 0;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.85rem;
  }

  p:first-child {
    color: #ffffff;
    font-weight: 500;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
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
