'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useGSAPScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  const containerRef = useRef<T | null>(null);

  useGSAP(
    () => {
      if (typeof window === 'undefined') return;

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const headingTargets = gsap.utils.toArray<HTMLElement>('[data-gsap="heading"]');
        headingTargets.forEach((el) => {
          gsap.from(el, {
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
              once: true,
            },
            y: 36,
            opacity: 0,
            duration: 0.85,
            ease: 'power3.out',
            clearProps: 'all',
          });
        });

        const cardTargets = gsap.utils.toArray<HTMLElement>('[data-gsap="card"]');
        cardTargets.forEach((el) => {
          gsap.from(el, {
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
              once: true,
            },
            y: 45,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            clearProps: 'all',
          });
        });

        const imageTargets = gsap.utils.toArray<HTMLElement>('[data-gsap="image"]');
        imageTargets.forEach((el) => {
          gsap.from(el, {
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
            scale: 0.93,
            clipPath: 'inset(8% 8% 8% 8%)',
            opacity: 0,
            duration: 1.15,
            ease: 'power3.out',
            clearProps: 'all',
          });
        });
      });

      return () => {
        mm.revert();
      };
    },
    { scope: containerRef }
  );

  return containerRef;
}
