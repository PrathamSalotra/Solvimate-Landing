'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  GridWrapper,
  GridContainer,
  CardsGrid,
  GroupCard,
  IconHeader,
  NumberBadge,
  IconCircle,
  CardTitle,
  CardDesc,
  SubItemsContainer,
  SubItemChip,
  SubItemDot,
} from './ServicesGrid.styles';

interface ServiceGroupData {
  num: string;
  keyTitle: string;
  keyDesc: string;
  itemKeys: string[];
  icon: React.ReactNode;
}

const SERVICES_DATA: ServiceGroupData[] = [
  {
    num: '01',
    keyTitle: 'services.g1_title',
    keyDesc: 'services.g1_desc',
    itemKeys: ['services.g1_i1', 'services.g1_i2', 'services.g1_i3'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    num: '02',
    keyTitle: 'services.g2_title',
    keyDesc: 'services.g2_desc',
    itemKeys: ['services.g2_i1', 'services.g2_i2', 'services.g2_i3', 'services.g2_i4'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="22" />
      </svg>
    ),
  },
  {
    num: '03',
    keyTitle: 'services.g3_title',
    keyDesc: 'services.g3_desc',
    itemKeys: ['services.g3_i1', 'services.g3_i2', 'services.g3_i3'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
      </svg>
    ),
  },
  {
    num: '04',
    keyTitle: 'services.g4_title',
    keyDesc: 'services.g4_desc',
    itemKeys: ['services.g4_i1', 'services.g4_i2', 'services.g4_i3'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
  },
  {
    num: '05',
    keyTitle: 'services.g5_title',
    keyDesc: 'services.g5_desc',
    itemKeys: ['services.g5_i1', 'services.g5_i2', 'services.g5_i3', 'services.g5_i4'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  {
    num: '06',
    keyTitle: 'services.g6_title',
    keyDesc: 'services.g6_desc',
    itemKeys: ['services.g6_i1', 'services.g6_i2', 'services.g6_i3', 'services.g6_i4'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
];

export default function ServicesGrid() {
  const { t } = useLanguage();

  return (
    <GridWrapper>
      <GridContainer>
        <CardsGrid>
          {SERVICES_DATA.map((item, idx) => (
            <GroupCard key={idx} data-gsap="card">
              <IconHeader>
                <NumberBadge aria-hidden="true">{item.num}</NumberBadge>
                <IconCircle>{item.icon}</IconCircle>
              </IconHeader>
              <CardTitle>{t(item.keyTitle)}</CardTitle>
              <CardDesc>{t(item.keyDesc)}</CardDesc>
              <SubItemsContainer>
                {item.itemKeys.map((itemKey, subIdx) => (
                  <SubItemChip key={subIdx}>
                    <SubItemDot aria-hidden="true" />
                    {t(itemKey)}
                  </SubItemChip>
                ))}
              </SubItemsContainer>
            </GroupCard>
          ))}
        </CardsGrid>
      </GridContainer>
    </GridWrapper>
  );
}
