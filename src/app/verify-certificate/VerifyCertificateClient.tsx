'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { useLanguage } from '@/context/LanguageContext';

const SectionWrapper = styled.section`
  width: 100%;
  padding: 3rem 1.5rem 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 2rem 1rem 4rem;
  }
`;

const PageContainer = styled.div`
  width: 100%;
  max-width: 1040px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

// Top Header Banner Card
const HeaderCard = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => (theme.isDark ? 'rgba(55, 251, 137, 0.25)' : theme.border)};
  border-radius: 20px;
  padding: 2.25rem 2.5rem;
  box-shadow: ${({ theme }) =>
    theme.isDark
      ? '0 16px 40px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(55, 251, 137, 0.1)'
      : '0 10px 30px rgba(0, 0, 0, 0.06)'};
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1.75rem 1.5rem;
  }
`;

const PillBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.accentBadgeBg};
  border: 1px solid ${({ theme }) => theme.accentBadgeBorder};
  color: ${({ theme }) => (theme.isDark ? '#BEFE72' : theme.accentText)};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 1.25rem;
`;

const MainHeading = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.foreground};
  margin: 0 0 0.85rem 0;
  line-height: 1.15;
  letter-spacing: -0.01em;

  @media (max-width: 768px) {
    font-size: 1.85rem;
  }
`;

const HeaderSubtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.98rem;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
  line-height: 1.6;
  max-width: 820px;
`;

// Two-Column Grid
const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 1.5rem;
  width: 100%;

  @media (max-width: 868px) {
    grid-template-columns: 1fr;
  }
`;

// Card Base for Grid Columns
const Card = styled.div`
  background-color: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => (theme.isDark ? 'rgba(55, 251, 137, 0.25)' : theme.border)};
  border-radius: 20px;
  padding: 2rem 2.25rem;
  box-shadow: ${({ theme }) =>
    theme.isDark
      ? '0 16px 40px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(55, 251, 137, 0.1)'
      : '0 10px 30px rgba(0, 0, 0, 0.06)'};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.35rem;
  font-weight: 700;
  color: ${({ theme }) => theme.foreground};
  margin: 0 0 0.5rem 0;
  line-height: 1.25;
`;

const SectionSubtext = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0 0 1.75rem 0;
  line-height: 1.5;
`;

// Form Elements
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FieldLabel = styled.label`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.foreground};
`;

const Input = styled.input`
  width: 100%;
  height: 48px;
  background: ${({ theme }) => (theme.isDark ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0.02)')};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 0 1rem;
  font-size: 0.95rem;
  font-family: ${({ theme }) => theme.fonts.mono};
  color: ${({ theme }) => theme.foreground};
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  box-sizing: border-box;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px
      ${({ theme }) => (theme.isDark ? 'rgba(190, 254, 114, 0.15)' : 'rgba(15, 122, 77, 0.15)')};
  }

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
    opacity: 0.6;
  }
`;

const HelpText = styled.span`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.4;
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 9999px;
  background: #befe72;
  color: #001e2b;
  font-size: 0.98rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  box-shadow: 0 10px 25px -5px rgba(190, 254, 114, 0.35);
  transition:
    transform 0.2s ease,
    background-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    background: #37fb89;
    transform: translateY(-2px);
    box-shadow: 0 14px 30px -5px rgba(190, 254, 114, 0.45);
  }

  &:active {
    transform: translateY(0);
  }
`;

// Right Column: Inner Info Boxes
const InfoBoxesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InfoBox = styled.div`
  background: ${({ theme }) => (theme.isDark ? 'rgba(0, 0, 0, 0.18)' : 'rgba(0, 0, 0, 0.02)')};
  border: 1px solid ${({ theme }) => (theme.isDark ? 'rgba(55, 251, 137, 0.15)' : theme.border)};
  border-radius: 14px;
  padding: 1.1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const InfoBoxTitle = styled.div`
  font-size: 0.88rem;
  font-weight: 700;
  color: ${({ theme }) => (theme.isDark ? '#BEFE72' : theme.accentText)};
`;

const InfoBoxDesc = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.45;
`;

// Search Result Banner Card
const ResultCard = styled.div<{ $isValid: boolean }>`
  margin-top: 1.25rem;
  padding: 1.25rem;
  border-radius: 14px;
  background: ${({ theme, $isValid }) =>
    $isValid
      ? theme.isDark
        ? 'rgba(55, 251, 137, 0.08)'
        : 'rgba(15, 122, 77, 0.08)'
      : 'rgba(239, 68, 68, 0.08)'};
  border: 1px solid
    ${({ theme, $isValid }) =>
      $isValid
        ? theme.isDark
          ? 'rgba(55, 251, 137, 0.3)'
          : 'rgba(15, 122, 77, 0.3)'
        : 'rgba(239, 68, 68, 0.3)'};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StatusTitle = styled.div<{ $isValid: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 0.95rem;
  color: ${({ theme, $isValid }) =>
    $isValid ? (theme.isDark ? theme.colors.mint : theme.accentText) : theme.error};
`;

const StatusDetail = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.4;
`;

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
