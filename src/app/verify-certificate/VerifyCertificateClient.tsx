'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import {
  SectionWrapper,
  PageContainer,
  HeaderCard,
  PillBadge,
  MainHeading,
  HeaderSubtitle,
  ContentGrid,
  Card,
  SectionTitle,
  SectionSubtext,
  Form,
  InputGroup,
  FieldLabel,
  Input,
  HelpText,
  SubmitButton,
  InfoBoxesContainer,
  InfoBox,
  InfoBoxTitle,
  InfoBoxDesc,
} from './VerifyCertificateClient.styles';

export default function VerifyCertificateClient() {
  const [certId, setCertId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = certId.trim().toUpperCase();
    if (!id) return;

    setIsVerifying(true);
    router.push(`/verify-certificate/${encodeURIComponent(id)}`);
  };

  return (
    <SectionWrapper>
      <PageContainer>
        {/* Header Banner Card */}
        <HeaderCard>
          <PillBadge>{t('verify_page.trust_layer_badge')}</PillBadge>
          <MainHeading>{t('verify_page.title')}</MainHeading>
          <HeaderSubtitle>{t('verify_page.subtitle')}</HeaderSubtitle>
        </HeaderCard>

        {/* Bottom 2-Column Grid */}
        <ContentGrid>
          {/* Left Column: Search by Certificate ID */}
          <Card>
            <SectionTitle>{t('verify_page.search_card_title')}</SectionTitle>
            <SectionSubtext>{t('verify_page.search_card_subtext')}</SectionSubtext>

            <Form onSubmit={handleSubmit}>
              <InputGroup>
                <FieldLabel htmlFor="certId">{t('verify_page.field_label')}</FieldLabel>
                <Input
                  id="certId"
                  type="text"
                  placeholder="SVM26-A8X9Q2"
                  value={certId}
                  onChange={(e) => setCertId(e.target.value)}
                  required
                />
                <HelpText>{t('verify_page.field_help')}</HelpText>
              </InputGroup>

              <SubmitButton type="submit" disabled={isVerifying}>
                {isVerifying ? t('verify_page.button_verifying') : t('verify_page.button_verify')}
              </SubmitButton>
            </Form>
          </Card>

          {/* Right Column: How It Works */}
          <Card>
            <SectionTitle>{t('verify_page.how_it_works_title')}</SectionTitle>
            <SectionSubtext>{t('verify_page.how_it_works_subtext')}</SectionSubtext>

            <InfoBoxesContainer>
              <InfoBox>
                <InfoBoxTitle>{t('verify_page.format_example_title')}</InfoBoxTitle>
                <InfoBoxDesc>{t('verify_page.format_example_desc')}</InfoBoxDesc>
              </InfoBox>

              <InfoBox>
                <InfoBoxTitle>{t('verify_page.permanent_url_title')}</InfoBoxTitle>
                <InfoBoxDesc>{t('verify_page.permanent_url_desc')}</InfoBoxDesc>
              </InfoBox>

              <InfoBox>
                <InfoBoxTitle>{t('verify_page.trust_signal_title')}</InfoBoxTitle>
                <InfoBoxDesc>{t('verify_page.trust_signal_desc')}</InfoBoxDesc>
              </InfoBox>
            </InfoBoxesContainer>
          </Card>
        </ContentGrid>
      </PageContainer>
    </SectionWrapper>
  );
}
