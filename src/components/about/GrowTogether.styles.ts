import Link from 'next/link';
import styled, { keyframes, css } from 'styled-components';

export const SectionWrapper = styled.section`
  width: 100%;
  padding: 5.5rem 1.5rem 6.5rem;
  background: ${({ theme }) => theme.background};

  @media (max-width: 768px) {
    padding: 4rem 1rem 5rem;
  }
`;

export const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const HeaderGroup = styled.div`
  max-width: 680px;
  margin-bottom: 3.5rem;
`;

export const TagText = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  display: inline-block;
  font-size: 0.8125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.6rem;
`;

export const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.85rem, 3.5vw, 2.75rem);
  font-weight: 500;
  letter-spacing: -0.01em;
  word-spacing: 0.08em;
  color: ${({ theme }) => theme.foreground};
  line-height: 1.25;
  margin: 0 0 1rem;
`;

export const SectionBody = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.7;
  margin: 0;
`;

export const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 3rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const BenefitCard = styled.div`
  position: relative;
  z-index: 2;
  background: ${({ theme }) => theme.surface};
  opacity: 1;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: ${({ theme }) => (theme.isDark ? '0 10px 30px rgba(0, 0, 0, 0.25)' : '0 10px 30px rgba(0, 0, 0, 0.08)')};
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
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

export const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.15rem;
  font-weight: 500;
  word-spacing: 0.06em;
  color: ${({ theme }) => theme.foreground};
  margin: 0;
`;

export const CardBody = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.95rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.6;
  margin: 0;
`;

export const CTAButton = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.body};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.95rem 2rem;
  border-radius: 9999px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.colors.ink};
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  box-shadow: 0 4px 14px rgba(190, 254, 114, 0.35);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(190, 254, 114, 0.45);
  }
`;

