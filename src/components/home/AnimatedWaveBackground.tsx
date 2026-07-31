'use client';

import React from 'react';
import styled, { keyframes, useTheme } from 'styled-components';

const waveDrift = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const WaveContainer = styled.div`
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

const WaveSvg = styled.svg<{
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

/**
 * AnimatedWaveBackground (§4 of UI Design Spec)
 *
 * Technical Approach:
 * - 2-3 thin SVG wave paths in Lime (#BEFE72) and Mint (#37FB89) at 20-35% opacity.
 * - Looping horizontally at different speeds via CSS transform: translateX() keyframes.
 * - Positioned absolutely behind content with pointer-events: none.
 * - Mounted only in Hero section.
 * - Under prefers-reduced-motion: reduce, disables animation entirely and renders
 *   a single static wave line instead of removing the element outright.
 */
export default function AnimatedWaveBackground() {
  const theme = useTheme();

  return (
    <WaveContainer aria-hidden="true" data-testid="animated-wave-background">
      {/* Wave 1: Lime (#BEFE72 / theme.primaryText), 32% opacity, primary static wave fallback under reduced-motion */}
      <WaveSvg
        viewBox="0 0 2880 400"
        preserveAspectRatio="none"
        $duration="18s"
        $opacity={0.32}
        $isSecondary={false}
      >
        <path
          d="M 0 200 Q 360 120 720 200 T 1440 200 T 2160 200 T 2880 200"
          fill="none"
          stroke={theme.primaryText}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </WaveSvg>

      {/* Wave 2: Mint (#37FB89), 26% opacity, different phase and speed (24s) */}
      <WaveSvg
        viewBox="0 0 2880 400"
        preserveAspectRatio="none"
        $duration="24s"
        $opacity={0.26}
        $isSecondary={true}
      >
        <path
          d="M 0 220 Q 360 310 720 220 T 1440 220 T 2160 220 T 2880 220"
          fill="none"
          stroke={theme.primaryHover}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </WaveSvg>

      {/* Wave 3: Lime (#BEFE72 / theme.primaryText), 20% opacity, different speed (32s) */}
      <WaveSvg
        viewBox="0 0 2880 400"
        preserveAspectRatio="none"
        $duration="32s"
        $opacity={0.2}
        $isSecondary={true}
      >
        <path
          d="M 0 170 Q 360 260 720 170 T 1440 170 T 2160 170 T 2880 170"
          fill="none"
          stroke={theme.primaryText}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </WaveSvg>
    </WaveContainer>
  );
}
