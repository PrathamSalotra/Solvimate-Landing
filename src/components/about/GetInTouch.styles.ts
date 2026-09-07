import Link from 'next/link';
import styled, { keyframes, css } from 'styled-components';

export const SectionWrapper = styled.section`
  width: 100%;
  padding: 5.5rem 1.5rem;
  background: ${({ theme }) => theme.background};
  border-top: 1px solid ${({ theme }) => theme.border};
  border-bottom: 1px solid ${({ theme }) => theme.border};

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

export const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const HeaderGroup = styled.div`
  max-width: 680px;
  margin-bottom: 3rem;
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

export const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;
  margin-bottom: 2.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ContactCard = styled.div`
  position: relative;
  z-index: 2;
  background: ${({ theme }) => theme.surface};
  opacity: 1;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: ${({ theme }) => (theme.isDark ? '0 10px 30px rgba(0, 0, 0, 0.25)' : '0 10px 30px rgba(0, 0, 0, 0.08)')};
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.primary};
    box-shadow: ${({ theme }) => (theme.isDark ? '0 18px 45px rgba(0, 0, 0, 0.4)' : '0 18px 45px rgba(0, 0, 0, 0.12)')};
  }
`;

export const ContactLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.825rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const ContactValueLink = styled.a`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.foreground};
  text-decoration: none;
  word-break: break-all;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

export const ContactValueText = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.05rem;
  font-weight: 600;
  color: ${({ theme }) => theme.foreground};
`;

export const CTAButtonsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const PrimaryButton = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.body};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 1.75rem;
  border-radius: 9999px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.colors.ink};
  font-weight: 700;
  font-size: 0.95rem;
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

export const SecondaryButton = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.body};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 1.75rem;
  border-radius: 9999px;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.foreground};
  font-weight: 700;
  font-size: 0.95rem;
  text-decoration: none;
  transition:
    border-color 0.2s ease,
    background 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    background: rgba(190, 254, 114, 0.12);
  }
`;

