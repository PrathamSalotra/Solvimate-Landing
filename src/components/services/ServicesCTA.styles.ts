import Link from 'next/link';
import styled, { keyframes, css } from 'styled-components';

export const SectionWrapper = styled.section`
  width: 100%;
  padding: 6rem 1.5rem 7rem;
  background: ${({ theme }) => theme.background};
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 4.5rem 1rem 5.5rem;
  }
`;

export const BannerCard = styled.div`
  max-width: 1000px;
  width: 100%;
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 28px;
  padding: 4rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.75rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.08);

  @media (max-width: 640px) {
    padding: 2.75rem 1.5rem;
  }
`;

export const GlowSpot = styled.div`
  position: absolute;
  width: 450px;
  height: 450px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(190, 254, 114, 0.15) 0%, rgba(190, 254, 114, 0) 70%);
  top: -50%;
  right: -20%;
  pointer-events: none;
`;

export const Headline = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 500;
  letter-spacing: -0.01em;
  word-spacing: 0.08em;
  color: ${({ theme }) => theme.foreground};
  line-height: 1.2;
  margin: 0;
  max-width: 700px;
  position: relative;
  z-index: 1;
`;

export const Description = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: clamp(1.05rem, 1.5vw, 1.25rem);
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.65;
  margin: 0;
  max-width: 680px;
  position: relative;
  z-index: 1;
`;

export const QuoteButton = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.body};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.25rem;
  border-radius: 9999px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.colors.ink};
  font-weight: 700;
  font-size: 1.05rem;
  text-decoration: none;
  position: relative;
  z-index: 1;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
  box-shadow: 0 4px 14px rgba(190, 254, 114, 0.35);

  &:hover {
    transform: translateY(-2px);
    background: ${({ theme }) => theme.primaryHover};
    box-shadow: 0 6px 20px rgba(190, 254, 114, 0.45);
  }

  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.primary};
    outline-offset: 4px;
  }
`;

