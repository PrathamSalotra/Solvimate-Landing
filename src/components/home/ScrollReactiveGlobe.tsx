'use client';

import React, { useEffect, useRef } from 'react';
import styled, { useTheme } from 'styled-components';
import createGlobe from 'cobe';

const GlobeWrapper = styled.div`
  width: 100%;
  max-width: 540px;
  aspect-ratio: 1 / 1;
  position: relative;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;

  @media (max-width: 768px) {
    max-width: 360px;
  }
`;

const StyledCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  contain: layout paint size;
  opacity: 0;
  transition: opacity 0.8s ease;
`;

const IDLE_VELOCITY = 0.003;
const MAX_VELOCITY = 0.045;

/**
 * ScrollReactiveGlobe (§7 of UI Design Spec)
 *
 * Technical Approach:
 * - Built on `cobe` WebGL canvas globe.
 * - Continuous slow idle rotation when idle.
 * - Tracks scroll velocity in rAF frame loop diffing window.scrollY.
 * - Clamps max velocity to prevent disorienting fast spins.
 * - Decays velocity smoothly toward idle speed (velocity = velocity * 0.94 + idleVelocity * 0.06).
 * - Pauses rendering (cancels rAF frame loop) via IntersectionObserver when scrolled out of view.
 * - Under prefers-reduced-motion, holds fixed slow idle rotation and ignores scroll.
 */
export default function ScrollReactiveGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();

  const isVisible = useRef(false);
  const isReducedMotion = useRef(false);
  const lastScrollY = useRef(0);
  const velocity = useRef(IDLE_VELOCITY);
  const animFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !wrapperRef.current) return;

    // 1. Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    isReducedMotion.current = mediaQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotion.current = e.matches;
      if (e.matches) {
        velocity.current = IDLE_VELOCITY;
      }
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    let phi = 0;
    let width = wrapperRef.current.clientWidth;
    lastScrollY.current = window.scrollY;

    const isDark = theme.isDark;
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.25,
      dark: isDark ? 1 : 0,
      diffuse: 1.5,
      mapSamples: 24000,
      mapBrightness: isDark ? 10 : 6,
      // Dark mode: bright mint/teal continents [0.22, 0.55, 0.45]
      // Light mode: continents #2A362E ([0.165, 0.212, 0.180]), water/glow is dark mode continent color ([0.22, 0.55, 0.45])
      baseColor: isDark ? [0.22, 0.55, 0.45] : [0.90, 0.98, 0.90],
      markerColor: isDark ? [0.74, 0.99, 0.44] : [0.165, 0.212, 0.18],
      glowColor: isDark ? [0.22, 0.98, 0.54] : [0.22, 0.55, 0.45],
      markers: [
        { location: [37.7595, -122.4367], size: 0.06 }, // San Francisco
        { location: [28.6139, 77.209], size: 0.06 }, // New Delhi
        { location: [51.5074, -0.1278], size: 0.06 }, // London
        { location: [35.6762, 139.6503], size: 0.06 }, // Tokyo
        { location: [-33.8688, 151.2093], size: 0.06 }, // Sydney
      ],
    });

    // Main rAF frame loop
    const frameLoop = () => {
      if (!isVisible.current) return;

      if (isReducedMotion.current) {
        // Hold fixed slow idle rotation under prefers-reduced-motion
        phi += IDLE_VELOCITY;
      } else {
        // Track scroll velocity via frame diffing
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollY.current;
        lastScrollY.current = currentScrollY;

        if (Math.abs(scrollDelta) > 0.05) {
          const addedVelocity = scrollDelta * 0.0006;
          velocity.current += addedVelocity;

          // Clamp velocity to sane maximum
          velocity.current = Math.max(
            Math.min(velocity.current, MAX_VELOCITY),
            -MAX_VELOCITY
          );
        }

        // Smooth physical decay toward idle speed
        velocity.current = velocity.current * 0.94 + IDLE_VELOCITY * 0.06;
        phi += velocity.current;
      }

      globe.update({ phi });
      animFrameIdRef.current = requestAnimationFrame(frameLoop);
    };

    const startRendering = () => {
      if (!animFrameIdRef.current) {
        lastScrollY.current = window.scrollY;
        animFrameIdRef.current = requestAnimationFrame(frameLoop);
      }
    };

    const stopRendering = () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
    };

    // 2. Set up IntersectionObserver to pause rendering (cancel rAF) when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          startRendering();
        } else {
          stopRendering();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(wrapperRef.current);

    // Reveal canvas smoothly after initialization
    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = '1';
      }
    }, 100);

    // Handle window resize
    const handleResize = () => {
      if (wrapperRef.current && canvasRef.current) {
        width = wrapperRef.current.clientWidth;
        globe.update({ width: width * 2, height: width * 2 });
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      stopRendering();
      mediaQuery.removeEventListener('change', handleMotionChange);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      globe.destroy();
    };
  }, [theme]);

  return (
    <GlobeWrapper ref={wrapperRef} data-testid="scroll-reactive-globe">
      <StyledCanvas ref={canvasRef} />
    </GlobeWrapper>
  );
}
