import styled, { keyframes, css } from 'styled-components';

export const GridWrapper = styled.section`
  width: 100%;
  padding: 5rem 1.5rem;
  background: ${({ theme }) => theme.background};
  border-top: 1px solid ${({ theme }) => theme.border};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

export const GridContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const GroupCard = styled.div`
  position: relative;
  z-index: 2;
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 2.25rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: ${({ theme }) => theme.primaryHover};
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.08);
  }
`;

export const IconHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NumberBadge = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 1.5rem;
  font-weight: 900;
  color: ${({ theme }) => theme.numberTag};
`;

export const IconCircle = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(190, 254, 114, 0.12);
  color: ${({ theme }) => theme.primaryText};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 22px;
    height: 22px;
  }
`;

export const CardTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.35rem;
  font-weight: 500;
  word-spacing: 0.06em;
  color: ${({ theme }) => theme.foreground};
  margin: 0;
  line-height: 1.3;
`;

export const CardDesc = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.95rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.65;
  margin: 0;
  flex-grow: 1;
`;

export const SubItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
  border-top: 1px solid ${({ theme }) => theme.border};
  padding-top: 1.25rem;
`;

export const SubItemChip = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.825rem;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.04);
  color: ${({ theme }) => theme.foreground};
  border: 1px solid ${({ theme }) => theme.border};

  @media (max-width: 767px) {
    font-size: 0.8rem;
    padding: 0.35rem 0.75rem;
  }
`;

export const SubItemDot = styled.span`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary};
  display: inline-block;
`;
