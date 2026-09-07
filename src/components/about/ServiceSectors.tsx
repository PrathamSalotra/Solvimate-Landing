'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  SectionWrapper,
  SectionContainer,
  HeaderGroup,
  TagText,
  SectionTitle,
  SectionBody,
  SectorsGrid,
  SectorCard,
  NumberBadge,
  SectorTitle,
  SectorDesc,
} from './ServiceSectors.styles';

interface SectorItem {
  num: string;
  keyTitle: string;
  keyDesc: string;
}

const SECTORS_DATA: SectorItem[] = [
  { num: '01', keyTitle: 'about.sector_s1_title', keyDesc: 'about.sector_s1_desc' },
  { num: '02', keyTitle: 'about.sector_s2_title', keyDesc: 'about.sector_s2_desc' },
  { num: '03', keyTitle: 'about.sector_s3_title', keyDesc: 'about.sector_s3_desc' },
  { num: '04', keyTitle: 'about.sector_s4_title', keyDesc: 'about.sector_s4_desc' },
  { num: '05', keyTitle: 'about.sector_s5_title', keyDesc: 'about.sector_s5_desc' },
  { num: '06', keyTitle: 'about.sector_s6_title', keyDesc: 'about.sector_s6_desc' },
];

export default function ServiceSectors() {
  const { t } = useLanguage();

  return (
    <SectionWrapper>
      <SectionContainer>
        <HeaderGroup data-gsap="heading">
          <TagText>{t('about.sectorsTag')}</TagText>
          <SectionTitle>{t('about.sectorsHeading')}</SectionTitle>
          <SectionBody>{t('about.sectorsBody')}</SectionBody>
        </HeaderGroup>

        <SectorsGrid>
          {SECTORS_DATA.map((item, idx) => (
            <SectorCard key={idx} data-gsap="card">
              <NumberBadge aria-hidden="true">{item.num}</NumberBadge>
              <SectorTitle>{t(item.keyTitle)}</SectorTitle>
              <SectorDesc>{t(item.keyDesc)}</SectorDesc>
            </SectorCard>
          ))}
        </SectorsGrid>
      </SectionContainer>
    </SectionWrapper>
  );
}
