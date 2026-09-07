import Link from 'next/link';
import styled, { keyframes, css } from 'styled-components';

export const ServicesWrapper = styled.section`
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.sectionDesktop} 1.5rem`};
  background: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: ${({ theme }) => `${theme.spacing.sectionMobile} 1rem`};
  }
`;

export const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 500;
  letter-spacing: -0.01em;
  word-spacing: 0.08em;
  color: ${({ theme }) => theme.foreground};
  margin: 0 0 1rem;
  text-align: center;
`;

export const SectionSubtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: clamp(1.0625rem, 1.8vw, 1.25rem);
  color: ${({ theme }) => theme.textSecondary};
  max-width: 680px;
  text-align: center;
  margin: 0 0 3.5rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    margin: 0 0 2.5rem;
  }
`;

export const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const ServiceCard = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: 100%;
  padding: 2.5rem 2rem;
  background: ${({ theme }) => theme.surface};
  opacity: 1;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: ${({ theme }) => (theme.isDark ? '0 10px 30px rgba(0, 0, 0, 0.25)' : '0 10px 30px rgba(0, 0, 0, 0.08)')};
  transition:
    transform ${({ theme }) => theme.motion.interaction} ease,
    border-color ${({ theme }) => theme.motion.interaction} ease,
    box-shadow ${({ theme }) => theme.motion.interaction} ease;

  &:hover {
    transform: translateY(-6px);
    border-color: ${({ theme }) => theme.colors.mint};
    box-shadow: ${({ theme }) => (theme.isDark ? '0 18px 45px rgba(0, 0, 0, 0.4)' : '0 18px 45px rgba(0, 0, 0, 0.12)')};
  }

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.75rem;
`;

export const IconBadge = styled.div`
  width: 52px;
  height: 52px;
  border-radius: ${({ theme }) => theme.radius.default};
  background: ${({ theme }) => theme.accentBadgeBg};
  border: 1px solid ${({ theme }) => theme.accentBadgeBorder};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.mint};

  svg {
    width: 26px;
    height: 26px;
    fill: currentColor;
  }
`;

export const NumberBadge = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.numberTag};
`;

export const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.375rem;
  font-weight: 500;
  word-spacing: 0.06em;
  color: ${({ theme }) => theme.foreground};
  margin: 0 0 1rem;
  line-height: 1.3;
`;

export const CardDesc = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0 0 2rem;
  flex-grow: 1;
`;

export const LearnMoreLink = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.body};
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.primaryText};
  font-weight: 600;
  font-size: 0.9375rem;
  text-decoration: none;
  margin-top: auto;
  transition: color ${({ theme }) => theme.motion.hover} ease;

  &:hover {
    color: ${({ theme }) => theme.colors.mint};
    text-decoration: underline;
  }
`;

