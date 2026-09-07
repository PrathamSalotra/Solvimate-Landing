import styled, { keyframes, css } from 'styled-components';

export const marqueeScroll = keyframes`
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
`;

export const MarqueeSection = styled.section`
  width: 100%;
  padding: 3.5rem 0 4.5rem;
  border-top: 1px solid ${({ theme }) => theme.border};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.cardBg};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 228px;

  @media (max-width: 768px) {
    min-height: 196px;
  }
`;

export const SectionHeader = styled.h2`
  font-size: 0.8125rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  word-spacing: 0.08em;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0 0 2rem;
  text-align: center;
  padding: 0 1.5rem;
`;

export const ViewportContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  overflow: hidden;
  position: relative;
  padding: 0.75rem 0;
  min-height: 56px;
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
  mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);

  @media (max-width: 768px) {
    min-height: 48px;
  }

  @media (prefers-reduced-motion: reduce) {
    mask-image: none !important;
    -webkit-mask-image: none !important;
    overflow: visible;
  }
`;

export const CarouselTrack = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  min-height: 32px;
  animation: ${marqueeScroll} 28s linear infinite;

  @media (max-width: 768px) {
    min-height: 24px;
  }

  &:hover,
  &:focus-within {
    animation-play-state: paused;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
    transform: none !important;
    width: 100%;
    justify-content: center;
  }
`;

export const LogoStrip = styled.div<{ $isDuplicate?: boolean }>`
  display: flex;
  align-items: center;
  gap: 4.5rem;
  padding-right: 4.5rem;
  flex-shrink: 0;
  min-height: 32px;

  @media (max-width: 768px) {
    gap: 3rem;
    padding-right: 3rem;
    min-height: 24px;
  }

  @media (prefers-reduced-motion: reduce) {
    ${({ $isDuplicate }) =>
      $isDuplicate
        ? `
      display: none !important;
    `
        : `
      flex-wrap: wrap;
      justify-content: center;
      padding-right: 0;
      width: 100%;
      gap: 2rem 3rem;
    `}
  }
`;

export const LogoImage = styled.img<{ $scale?: number }>`
  height: ${({ $scale = 1 }) => Math.round(32 * $scale)}px;
  width: auto;
  max-width: 200px;
  object-fit: contain;
  opacity: 1;
  flex-shrink: 0;
  cursor: pointer;
  transition: transform 0.25s ease;

  &:hover,
  &:focus-visible {
    transform: scale(1.04);
    outline: none;
  }

  @media (max-width: 768px) {
    height: ${({ $scale = 1 }) => Math.round(24 * $scale)}px;
    max-width: 140px;
  }
`;

