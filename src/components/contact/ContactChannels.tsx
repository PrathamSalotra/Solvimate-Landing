'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  ChannelsWrapper,
  ChannelsContainer,
  ChannelCard,
  IconCircle,
  ChannelTitle,
  ChannelValue,
} from './ContactChannels.styles';

export default function ContactChannels() {
  const { t } = useLanguage();

  return (
    <ChannelsWrapper>
      <ChannelsContainer>
        <ChannelCard data-gsap="card">
          <IconCircle>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </IconCircle>
          <ChannelTitle>{t('contact_page.email_label')}</ChannelTitle>
          <ChannelValue>
            <a href="mailto:sales@solvimate.com">{t('contact_page.email_value')}</a>
          </ChannelValue>
        </ChannelCard>

        <ChannelCard data-gsap="card">
          <IconCircle>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </IconCircle>
          <ChannelTitle>{t('contact_page.location_label')}</ChannelTitle>
          <ChannelValue>
            <a
              href="https://maps.app.goo.gl/MUtHub3T4fT2oYaHA"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('contact_page.location_value')}
            </a>
          </ChannelValue>
        </ChannelCard>

        <ChannelCard data-gsap="card">
          <IconCircle>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </IconCircle>
          <ChannelTitle>{t('contact_page.hours_label')}</ChannelTitle>
          <ChannelValue>{t('contact_page.hours_value')}</ChannelValue>
        </ChannelCard>
      </ChannelsContainer>
    </ChannelsWrapper>
  );
}
