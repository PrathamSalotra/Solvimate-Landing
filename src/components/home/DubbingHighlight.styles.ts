import styled, { keyframes, css } from 'styled-components';

export const SectionWrapper = styled.section`
  width: 100%;
  padding: 6rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.cardBg};
  border-bottom: 1px solid ${({ theme }) => theme.border};

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

export const ContentContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 3.5rem;
  align-items: center;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  max-height: 480px;
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.background} 0%,
    rgba(59, 130, 246, 0.15) 50%,
    rgba(16, 185, 129, 0.15) 100%
  );
  border: 1px solid ${({ theme }) => theme.border};
  @media (max-width: 992px) {
    order: 2;
  }
`;

export const ScrimOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 30, 43, 0.5); /* Solid low-opacity Ink overlay, not a drop shadow */
  z-index: 2;
  pointer-events: none;
`;

export const DubbingOverlayBadge = styled.div`
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  padding: 0.5rem 1rem;
  background: rgba(0, 30, 43, 0.85); /* Solid Ink background without blur or drop-shadow */
  border: 1px solid rgba(190, 254, 114, 0.35);
  border-radius: 9999px;
  color: ${({ theme }) => theme.colors.paper}; /* Paper-colored text */
  font-size: 0.8125rem;
  font-weight: 700;
  z-index: 3;
  pointer-events: none;
`;

export const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 992px) {
    order: 1;
  }
`;

export const TagPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
  padding: 0.4rem 1rem;
  border-radius: 9999px;
  background: rgba(190, 254, 114, 0.12);
  border: 1px solid rgba(190, 254, 114, 0.35);
  color: ${({ theme }) => theme.primaryText};
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const Headline = styled.h2`
  font-size: clamp(2.25rem, 4.5vw, 3.5rem);
  font-weight: 500;
  line-height: 1.15;
  letter-spacing: -0.01em;
  word-spacing: 0.08em;
  color: ${({ theme }) => theme.foreground};
  margin: 0;
`;

export const Description = styled.p`
  font-size: clamp(1.0625rem, 1.8vw, 1.25rem);
  line-height: 1.65;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
`;

export const FeaturesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

export const FeatureChip = styled.span`
  padding: 0.5rem 1rem;
  border-radius: 12px;
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.foreground};
  font-size: 0.875rem;
  font-weight: 600;
`;

export const PlaceholderFallback = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  text-align: center;
  background: radial-gradient(circle at center, rgba(190, 254, 114, 0.1) 0%, transparent 70%);
  color: ${({ theme }) => theme.textSecondary};
  z-index: 0;

  svg {
    width: 48px;
    height: 48px;
    opacity: 0.75;
    color: ${({ theme }) => theme.primaryText};
  }

  span {
    font-size: 0.9375rem;
    font-weight: 600;
    max-width: 320px;
  }
`;
