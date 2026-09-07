import styled, { keyframes, css } from 'styled-components';

export const StatsWrapper = styled.section`
  width: 100%;
  padding: 5.5rem 1.5rem;
  background: ${({ theme }) => theme.background};
  position: relative;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

export const StatsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 3.5rem;
`;

export const HeaderGroup = styled.div`
  max-width: 650px;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  align-items: center;
`;

export const TagText = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  display: inline-block;
  font-size: 0.8125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.85rem, 3.5vw, 2.75rem);
  font-weight: 800;
  color: ${({ theme }) => theme.foreground};
  line-height: 1.25;
  margin: 0;
`;

export const GridBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const StatCard = styled.div`
  position: relative;
  z-index: 2;
  background: ${({ theme }) => theme.surface};
  opacity: 1;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: ${({ theme }) => (theme.isDark ? '0 10px 30px rgba(0, 0, 0, 0.25)' : '0 10px 30px rgba(0, 0, 0, 0.08)')};
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.primaryHover};
    box-shadow: ${({ theme }) => (theme.isDark ? '0 18px 45px rgba(0, 0, 0, 0.4)' : '0 18px 45px rgba(0, 0, 0, 0.12)')};
  }
`;

export const NumberValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: clamp(2.5rem, 4.5vw, 3.75rem);
  font-weight: 900;
  color: ${({ theme }) => theme.primary};
  line-height: 1.05;
  letter-spacing: -0.02em;
`;

export const StatLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.05rem;
  font-weight: 700;
  color: ${({ theme }) => theme.foreground};
`;
