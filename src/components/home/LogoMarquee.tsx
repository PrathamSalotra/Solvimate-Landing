'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useLanguage } from '@/context/LanguageContext';
import {
  MarqueeSection,
  SectionHeader,
  ViewportContainer,
  CarouselTrack,
  LogoStrip,
  LogoImage,
} from './LogoMarquee.styles';

interface ClientLogo {
  name: string;
  src: string;
  isPlaceholder?: boolean;
  scale?: number;
}

const CLIENT_LOGOS: ClientLogo[] = [
  { name: 'BayanTech', src: '/client-logos/bayantech.png?v=20260731_2' },
  { name: 'FutureBeeAI', src: '/client-logos/futurebeeai.png?v=20260731_2' },
  { name: 'GienTech', src: '/client-logos/gientech.png?v=20260731_2' },
  { name: 'Josh Talks', src: '/client-logos/joshtalks.png?v=20260731_2', scale: 1.4 },
  {
    name: 'Kuku FM',
    src: '/client-logos/kukufm.png?v=20260731_2',
    // TODO [TRACKED]: Kuku FM logo flagged as placeholder pending official transparent export
    isPlaceholder: true,
  },
  { name: 'OpenAI', src: '/client-logos/openai.png?v=20260731_2', scale: 1.4 },
  { name: 'Pocket FM', src: '/client-logos/pocketfm.png?v=20260731_2', scale: 1.4 },
  { name: 'Story TV', src: '/client-logos/storytv.png?v=20260731_2', scale: 1.45 },
  { name: 'Uber', src: '/client-logos/uber.png?v=20260731_2', scale: 1.4 },
];



export default function LogoMarquee() {
  const { t } = useLanguage();

  return (
    <MarqueeSection aria-label={t('home.trustedBy')}>
      <SectionHeader>{t('home.trustedBy')}</SectionHeader>
      <ViewportContainer>
        <CarouselTrack>
          <LogoStrip $isDuplicate={false}>
            {CLIENT_LOGOS.map((logo, index) => (
              <LogoImage
                key={`logo-primary-${index}`}
                src={logo.src}
                alt={`${logo.name} logo`}
                title={logo.name}
                tabIndex={0}
                $scale={logo.scale || 1}
                width={150}
                height={Math.round(32 * (logo.scale || 1))}
                data-placeholder={logo.isPlaceholder ? 'true' : undefined}
                loading="eager"
                decoding="async"
              />
            ))}
          </LogoStrip>
          <LogoStrip $isDuplicate={true} aria-hidden="true">
            {CLIENT_LOGOS.map((logo, index) => (
              <LogoImage
                key={`logo-duplicate-${index}`}
                src={logo.src}
                alt=""
                title={logo.name}
                $scale={logo.scale || 1}
                width={150}
                height={Math.round(32 * (logo.scale || 1))}
                data-placeholder={logo.isPlaceholder ? 'true' : undefined}
                loading="eager"
                decoding="async"
              />
            ))}
          </LogoStrip>
        </CarouselTrack>
      </ViewportContainer>
    </MarqueeSection>
  );
}
