import styled, { keyframes, css } from 'styled-components';

export const SectionWrapper = styled.section`
  width: 100%;
  padding: 6rem 1.5rem 7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.foreground};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 4rem 1rem 5rem;
  }
`;

export const ContentContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.5rem;
  position: relative;
  z-index: 1;
`;

export const HeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
`;

export const BadgePill = styled.span`
  display: inline-block;
  padding: 0.4rem 1.1rem;
  border-radius: 9999px;
  background: ${({ theme }) => theme.accentBadgeBg};
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.accentText};
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

export const HeadingText = styled.h2`
  font-size: clamp(2.25rem, 4vw, 3.25rem);
  font-weight: 500;
  letter-spacing: -0.01em;
  word-spacing: 0.08em;
  color: ${({ theme }) => theme.foreground};
  margin: 0;
  line-height: 1.15;

  @media (max-width: 640px) {
    font-size: 2rem;
  }
`;

export const SubtitleText = styled.p`
  font-size: clamp(1.125rem, 2vw, 1.35rem);
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
  max-width: 680px;
  line-height: 1.6;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const TestimonialCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  padding: 2.25rem 2rem;
  border-radius: ${({ theme }) => theme.radius.card};
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-left: 4px solid ${({ theme }) => theme.primary};
  box-shadow: 0 15px 35px -10px rgba(0, 0, 0, 0.25);
  transition:
    transform ${({ theme }) => theme.motion.interaction} ease,
    box-shadow ${({ theme }) => theme.motion.interaction} ease;
  min-height: 100%;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 25px 45px -12px rgba(0, 0, 0, 0.35);
  }
`;

export const QuoteTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const StarsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${({ theme }) => theme.accentText};
  font-size: 1.125rem;
  letter-spacing: 0.1em;
`;

export const QuoteText = styled.p`
  font-size: 1.0625rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
  font-style: normal;
`;

export const AttributionFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.border};
`;

export const AvatarCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.colors.ink};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.125rem;
  flex-shrink: 0;
  border: 2px solid ${({ theme }) => theme.border};
`;

export const AuthorDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const AuthorName = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  word-spacing: 0.04em;
  color: ${({ theme }) => theme.foreground};
  margin: 0;
`;

export const AuthorRole = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.accentText};
  font-weight: 600;
`;
