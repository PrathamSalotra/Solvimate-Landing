import styled, { keyframes, css } from 'styled-components';

export const waveDrift = keyframes`
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
`;

export const WaveContainer = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const WaveSvg = styled.svg<{
  $duration: string;
  $opacity: number;
  $isSecondary?: boolean;
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 100%;
  pointer-events: none;
  opacity: ${({ $opacity }) => $opacity};
  animation: ${waveDrift} ${({ $duration }) => $duration} linear infinite;
  will-change: transform;

  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
    transform: translateX(0) !important;
    display: ${({ $isSecondary }) => ($isSecondary ? 'none' : 'block')};
  }
`;

