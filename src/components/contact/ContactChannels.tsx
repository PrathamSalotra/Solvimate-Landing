'use client';

import React from 'react';
import styled from 'styled-components';
import { useLanguage } from '@/context/LanguageContext';

const ChannelsWrapper = styled.section`
  width: 100%;
  padding: 2.5rem 1.5rem 4rem;
  background: ${({ theme }) => theme.background};
  position: relative;
  z-index: 2;
`;

const ChannelsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.75rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ChannelCard = styled.div`
  background: ${({ theme }) => theme.cardBg};
  position: relative;
  z-index: 2;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 2.25rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.primaryHover};
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.08);
  }
`;

const IconCircle = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 12px;
  background: rgba(190, 254, 114, 0.12);
  color: ${({ theme }) => theme.primaryText};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 22px;
    height: 22px;
  }
`;

const ChannelTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.95rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
`;

const ChannelValue = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.foreground};
  line-height: 1.5;
  white-space: pre-line;

  a {
    color: ${({ theme }) => theme.primaryText};
    text-decoration: none;
    transition: color 0.15s ease;

    &:hover {
      text-decoration: underline;
    }
  }
`;

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
            <a href="mailto:operationssolvimate@gmail.com">{t('contact_page.email_value')}</a>
          </ChannelValue>
        </ChannelCard>

        <ChannelCard data-gsap="card">
          <IconCircle>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </IconCircle>
          <ChannelTitle>{t('contact_page.phone_label')}</ChannelTitle>
          <ChannelValue>
            <a href="tel:+916307875230">{t('contact_page.phone_value')}</a>
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
              href="https://maps.google.com/?q=Varanasi,+Uttar+Pradesh,+India"
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
