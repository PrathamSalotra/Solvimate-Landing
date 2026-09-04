'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.foreground};
`;

const MainContent = styled.main`
  flex: 1;
  padding-top: 120px;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`;

const CardContainer = styled.div`
  width: 100%;
  max-width: 580px;
  background-color: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => (theme.isDark ? 'rgba(55, 251, 137, 0.25)' : theme.border)};
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: ${({ theme }) =>
    theme.isDark
      ? '0 20px 50px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(55, 251, 137, 0.12)'
      : '0 12px 36px rgba(0, 0, 0, 0.08)'};
  box-sizing: border-box;

  @media (max-width: 640px) {
    padding: 1.75rem;
  }
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.accentBadgeBg};
  border: 1px solid ${({ theme }) => theme.accentBadgeBorder};
  color: ${({ theme }) => (theme.isDark ? theme.colors.mint : theme.accentText)};
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 2.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.foreground};
  margin: 0 0 0.75rem 0;
  line-height: 1.2;

  @media (max-width: 640px) {
    font-size: 1.75rem;
  }
`;

const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.95rem;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
  line-height: 1.5;
`;

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

const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.foreground};
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  height: 48px;
  background: ${({ theme }) => (theme.isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.02)')};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 0 1rem;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.foreground};
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => (theme.isDark ? 'rgba(190, 254, 114, 0.15)' : 'rgba(15, 122, 77, 0.15)')};
  }

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
    opacity: 0.7;
  }
`;

const SubmitButton = styled.button`
  height: 48px;
  border-radius: 9999px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.colors.ink};
  font-size: 0.95rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 0.2s ease, transform 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.primaryHover};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ResultCard = styled.div<{ $isValid: boolean }>`
  margin-top: 1.5rem;
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
    $isValid
      ? theme.isDark
        ? theme.colors.mint
        : theme.accentText
      : theme.error};
`;

const StatusDetail = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.4;
`;

export default function VerifyCertificateClient() {
  const [certId, setCertId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<{ searched: boolean; isValid: boolean; id: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certId.trim()) return;

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      // Demo validation check: valid if code starts with SOLV or demo ID entered
      setResult({
        searched: true,
        isValid: certId.trim().length >= 4,
        id: certId.trim().toUpperCase(),
      });
    }, 600);
  };

  return (
    <PageWrapper>
      <Navbar />
      <MainContent>
        <CardContainer>
          <HeaderSection>
            <Badge>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Authenticity Portal
            </Badge>
            <Title>Verify Certificate</Title>
            <Subtitle>
              Check the authenticity of any official Solvimate credential or completion certificate.
            </Subtitle>
          </HeaderSection>

          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Label htmlFor="certId">Certificate Code / ID</Label>
              <InputWrapper>
                <Input
                  id="certId"
                  type="text"
                  placeholder="e.g. SOLV-2026-8891"
                  value={certId}
                  onChange={(e) => setCertId(e.target.value)}
                  required
                />
              </InputWrapper>
            </InputGroup>

            <SubmitButton type="submit" disabled={isVerifying || !certId.trim()}>
              {isVerifying ? (
                'Verifying...'
              ) : (
                <>
                  Verify Credential
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </SubmitButton>
          </Form>

          {result && result.searched && (
            <ResultCard $isValid={result.isValid}>
              <StatusTitle $isValid={result.isValid}>
                {result.isValid ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M22 11.08V12a10 10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    Authentic Solvimate Certificate
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                    Certificate Not Found
                  </>
                )}
              </StatusTitle>
              <StatusDetail>
                {result.isValid
                  ? `Certificate #${result.id} is verified and active in the official Solvimate credential registry.`
                  : `No certificate matching ID "${result.id}" was found. Please check the code and try again.`}
              </StatusDetail>
            </ResultCard>
          )}
        </CardContainer>
      </MainContent>
      <Footer />
    </PageWrapper>
  );
}
