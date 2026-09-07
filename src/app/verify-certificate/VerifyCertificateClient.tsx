'use client';

import React, { useState } from 'react';
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
  ResultCard,
  StatusTitle,
  StatusDetail,
} from './VerifyCertificateClient.styles';

// Top Header Banner Card
// Two-Column Grid
// Card Base for Grid Columns
// Form Elements
// Right Column: Inner Info Boxes
// Search Result Banner Card

export default function VerifyCertificateClient() {
  const [certId, setCertId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<{ searched: boolean; isValid: boolean; id: string } | null>(
    null
  );
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certId.trim()) return;

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setResult({
        searched: true,
        isValid: certId.trim().length >= 6,
        id: certId.trim().toUpperCase(),
      });
    }, 550);
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

              <SubmitButton type="submit">
                {isVerifying ? t('verify_page.button_verifying') : t('verify_page.button_verify')}
              </SubmitButton>
            </Form>

            {result && result.searched && (
              <ResultCard $isValid={result.isValid}>
                <StatusTitle $isValid={result.isValid}>
                  {result.isValid ? (
                    <>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M22 11.08V12a10 10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                      {t('verify_page.authentic_title')}
                    </>
                  ) : (
                    <>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                      </svg>
                      {t('verify_page.not_found_title')}
                    </>
                  )}
                </StatusTitle>
                <StatusDetail>
                  {result.isValid
                    ? t('verify_page.authentic_detail', { id: result.id })
                    : t('verify_page.not_found_detail', { id: result.id })}
                </StatusDetail>
              </ResultCard>
            )}
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
