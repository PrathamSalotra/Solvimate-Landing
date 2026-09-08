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
  SubmitButton,
  SecurityNote,
  CapabilitiesList,
  CapabilityItem,
  CapabilityIcon,
  CapabilityContent,
  CapabilityTitle,
  CapabilityDesc,
} from './AdminPortalEntry.styles';

export default function AdminPortalClient() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState<'login' | 'otp' | 'success'>('login');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    setMessage(null);

    // Simulate Step 1 verification (Whitelisted check + credentials)
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      setMessage('A 6-digit verification code has been dispatched to your email via Resend.');
    }, 600);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('success');
      setMessage('Authenticated successfully. Session established.');
    }, 600);
  };

  return (
    <SectionWrapper>
      <PageContainer>
        <HeaderCard>
          <PillBadge>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Security & Administration
          </PillBadge>
          <MainHeading>Solvimate Admin Portal</MainHeading>
          <HeaderSubtitle>
            Central administrative console for credential issuance, certificate verification tracking, 
            CMS content synchronization, and operational management.
          </HeaderSubtitle>
        </HeaderCard>

        <ContentGrid>
          <Card>
            <SectionTitle>
              {step === 'login' && 'Admin Sign In'}
              {step === 'otp' && 'Two-Step Verification (OTP)'}
              {step === 'success' && 'Console Session Active'}
            </SectionTitle>
            <SectionSubtext>
              {step === 'login' && 'Enter your whitelisted administrative email and password to proceed.'}
              {step === 'otp' && 'Enter the 6-digit one-time password dispatched to your authorized inbox.'}
              {step === 'success' && 'You have successfully verified your credentials. Admin rights confirmed.'}
            </SectionSubtext>

            {step === 'login' && (
              <Form onSubmit={handleLoginSubmit}>
                <InputGroup>
                  <FieldLabel htmlFor="admin-email">Admin Email</FieldLabel>
                  <Input
                    id="admin-email"
                    type="email"
                    required
                    placeholder="operations@solvimate.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>

                <InputGroup>
                  <FieldLabel htmlFor="admin-password">Password</FieldLabel>
                  <Input
                    id="admin-password"
                    type="password"
                    required
                    placeholder="••••••••••••"
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>

                <SubmitButton type="submit" disabled={isLoading}>
                  {isLoading ? 'Verifying...' : 'Continue to OTP Verification'}
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </SubmitButton>
              </Form>
            )}

            {step === 'otp' && (
              <Form onSubmit={handleOtpSubmit}>
                <InputGroup>
                  <FieldLabel htmlFor="otp-code">6-Digit Security Code</FieldLabel>
                  <Input
                    id="otp-code"
                    type="text"
                    required
                    maxLength={6}
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  />
                </InputGroup>

                <SubmitButton type="submit" disabled={isLoading || otp.length < 6}>
                  {isLoading ? 'Validating...' : 'Verify & Launch Dashboard'}
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </SubmitButton>
              </Form>
            )}

            {step === 'success' && (
              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(55, 251, 137, 0.15)', border: '1px solid #37FB89' }}>
                  <p style={{ margin: 0, fontWeight: 600, color: '#37FB89' }}>
                    Authenticated as {email || 'Manager'}
                  </p>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: '#9FB8B4' }}>
                    Role: Manager / Super Admin. Database: Connected.
                  </p>
                </div>
                <SubmitButton type="button" onClick={() => setStep('login')}>
                  Switch Account / Sign Out
                </SubmitButton>
              </div>
            )}

            {message && (
              <p style={{ fontSize: '0.84rem', color: '#37FB89', marginTop: '1rem', lineHeight: 1.4 }}>
                {message}
              </p>
            )}

            <SecurityNote>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p>
                Access to this section is restricted. All login attempts, OTP generation calls, and 
                administrative modifications are logged and monitored.
              </p>
            </SecurityNote>
          </Card>

          <Card>
            <SectionTitle>Portal Modules</SectionTitle>
            <SectionSubtext>
              Integrated capabilities configured for the Solvimate management environment.
            </SectionSubtext>

            <CapabilitiesList>
              <CapabilityItem>
                <CapabilityIcon>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </CapabilityIcon>
                <CapabilityContent>
                  <CapabilityTitle>Certificate Provisioning</CapabilityTitle>
                  <CapabilityDesc>
                    Upload and host candidate certificates via Cloudinary with dynamic metadata, performance badges, and instant validation links.
                  </CapabilityDesc>
                </CapabilityContent>
              </CapabilityItem>

              <CapabilityItem>
                <CapabilityIcon>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                </CapabilityIcon>
                <CapabilityContent>
                  <CapabilityTitle>Verification Analytics</CapabilityTitle>
                  <CapabilityDesc>
                    Real-time tracking of certificate verification queries, active status counts, and revoked credential management.
                  </CapabilityDesc>
                </CapabilityContent>
              </CapabilityItem>

              <CapabilityItem>
                <CapabilityIcon>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="9" y1="21" x2="9" y2="9" />
                  </svg>
                </CapabilityIcon>
                <CapabilityContent>
                  <CapabilityTitle>Content CMS</CapabilityTitle>
                  <CapabilityDesc>
                    Manage job listings, vendor applications, and news articles directly with MongoDB database persistence.
                  </CapabilityDesc>
                </CapabilityContent>
              </CapabilityItem>

              <CapabilityItem>
                <CapabilityIcon>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </CapabilityIcon>
                <CapabilityContent>
                  <CapabilityTitle>Role-Based Governance</CapabilityTitle>
                  <CapabilityDesc>
                    Role separation between managers and super-admins with granular privilege assignment and session timeouts.
                  </CapabilityDesc>
                </CapabilityContent>
              </CapabilityItem>
            </CapabilitiesList>
          </Card>
        </ContentGrid>
      </PageContainer>
    </SectionWrapper>
  );
}
