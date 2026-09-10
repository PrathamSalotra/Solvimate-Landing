'use client';

import React, { useState, useEffect, useRef } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ScrollReactiveGlobe from '@/components/home/ScrollReactiveGlobe';
import {
  LoginWrapper,
  LoginCard,
  CardHeader,
  BadgePill,
  StatusDot,
  Heading,
  Subtitle,
  StepTracker,
  StepItem,
  StepNumber,
  StepDivider,
  Form,
  FormGroup,
  Label,
  InputWrapper,
  InputIcon,
  Input,
  OtpInput,
  Button,
  AlertBox,
  ResendRow,
  ResendButton,
  FooterLinkContainer,
  Spinner,
  FixedBackgroundGlobe,
} from './AdminLogin.styles';

interface AdminLoginFormProps {
  callbackUrl?: string;
}

export default function AdminLoginForm({ callbackUrl = '/admin/dashboard' }: AdminLoginFormProps) {
  const router = useRouter();

  // Step state: 'credentials' | 'otp'
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');

  // Form input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [challengeId, setChallengeId] = useState('');

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  const otpInputRef = useRef<HTMLInputElement>(null);

  // Cooldown countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => {
      setCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  // Focus OTP input upon entering Step 2
  useEffect(() => {
    if (step === 'otp') {
      const timer = setTimeout(() => {
        otpInputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Handle Step 1: Request OTP
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setInfoMessage(null);

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) {
      setErrorMessage('Please enter your administrator email address.');
      return;
    }
    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters in length.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/admin/auth/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || 'Unable to process authentication request.');
        setIsLoading(false);
        return;
      }

      setChallengeId(data.challengeId);
      setStep('otp');
      setCooldown(30);
      setInfoMessage(`A 6-digit verification code has been dispatched to ${cleanEmail}`);
    } catch (err) {
      setErrorMessage('A network error occurred. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Step 2: Verify OTP via NextAuth signIn
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanOtp = otp.trim();
    if (!cleanOtp || cleanOtp.length !== 6) {
      setErrorMessage('Please enter the complete 6-digit verification code.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email: email.trim().toLowerCase(),
        password,
        otp: cleanOtp,
        challengeId,
        redirect: false,
        callbackUrl,
      });

      if (!result || result.error) {
        setErrorMessage(
          result?.error === 'CredentialsSignin'
            ? 'Invalid or expired verification code. Please check your code and try again.'
            : result?.error || 'Authentication failed. Please verify your credentials.'
        );
        setIsLoading(false);
        return;
      }

      // Success transition
      setInfoMessage('Authentication verified. Redirecting to Admin Dashboard...');
      router.push(result.url || callbackUrl);
    } catch (err) {
      setErrorMessage('An unexpected error occurred during sign-in.');
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (cooldown > 0 || isLoading) return;
    setErrorMessage(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/admin/auth/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || 'Failed to resend code.');
        setIsLoading(false);
        return;
      }

      setChallengeId(data.challengeId);
      setOtp('');
      setCooldown(30);
      setInfoMessage('A fresh verification code has been dispatched to your email.');
    } catch (err) {
      setErrorMessage('Unable to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Go back to credentials
  const handleBackToCredentials = () => {
    setStep('credentials');
    setOtp('');
    setErrorMessage(null);
    setInfoMessage(null);
  };

  return (
    <>
      <FixedBackgroundGlobe aria-hidden="true">
        <ScrollReactiveGlobe />
      </FixedBackgroundGlobe>
      <LoginWrapper>
      <LoginCard>
        <CardHeader>
          <BadgePill>
            <StatusDot />
            Admin Security Perimeter
          </BadgePill>
          <Heading>Sign In</Heading>
          <Subtitle>
            {step === 'credentials'
              ? 'Enter your administrative credentials to continue'
              : 'Enter the 6-digit code sent to your authorized email'}
          </Subtitle>
        </CardHeader>

        <StepTracker>
          <StepItem $active={step === 'credentials'} $completed={step === 'otp'}>
            <StepNumber $active={step === 'credentials'} $completed={step === 'otp'}>
              1
            </StepNumber>
            Credentials
          </StepItem>
          <StepDivider $completed={step === 'otp'} />
          <StepItem $active={step === 'otp'} $completed={false}>
            <StepNumber $active={step === 'otp'} $completed={false}>
              2
            </StepNumber>
            OTP Verification
          </StepItem>
        </StepTracker>

        {errorMessage && (
          <AlertBox $type="error" style={{ marginBottom: '1.25rem' }}>
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{errorMessage}</span>
          </AlertBox>
        )}

        {infoMessage && (
          <AlertBox $type="info" style={{ marginBottom: '1.25rem' }}>
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <span>{infoMessage}</span>
          </AlertBox>
        )}

        {step === 'credentials' ? (
          <Form onSubmit={handleRequestOtp}>
            <FormGroup>
              <Label htmlFor="admin-email">Admin Email</Label>
              <InputWrapper>
                <InputIcon>
                  <svg viewBox="0 0 24 24">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </InputIcon>
                <Input
                  id="admin-email"
                  type="email"
                  $hasIcon
                  placeholder="admin@solvimate.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  disabled={isLoading}
                />
              </InputWrapper>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="admin-password">Password</Label>
              <InputWrapper>
                <InputIcon>
                  <svg viewBox="0 0 24 24">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </InputIcon>
                <Input
                  id="admin-password"
                  type="password"
                  $hasIcon
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  disabled={isLoading}
                />
              </InputWrapper>
            </FormGroup>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner />
                  <span>Validating Credentials...</span>
                </>
              ) : (
                <span>Continue with Two-Factor &rarr;</span>
              )}
            </Button>
          </Form>
        ) : (
          <Form onSubmit={handleVerifyOtp}>
            <FormGroup>
              <Label htmlFor="otp-code">6-Digit Verification Code</Label>
              <OtpInput
                id="otp-code"
                ref={otpInputRef}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                placeholder="••••••"
                value={otp}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setOtp(val);
                }}
                disabled={isLoading}
                autoComplete="one-time-code"
                required
              />
            </FormGroup>

            <ResendRow>
              <span>Didn&apos;t receive code?</span>
              <ResendButton
                type="button"
                onClick={handleResendOtp}
                disabled={cooldown > 0 || isLoading}
              >
                {cooldown > 0 ? `Resend code in ${cooldown}s` : 'Resend Code'}
              </ResendButton>
            </ResendRow>

            <Button type="submit" disabled={isLoading || otp.length !== 6}>
              {isLoading ? (
                <>
                  <Spinner />
                  <span>Verifying Code...</span>
                </>
              ) : (
                <span>Complete Admin Sign In &rarr;</span>
              )}
            </Button>

            <Button
              type="button"
              $variant="ghost"
              onClick={handleBackToCredentials}
              disabled={isLoading}
            >
              &larr; Back to Email &amp; Password
            </Button>
          </Form>
        )}

        <FooterLinkContainer>
          <span>Return to</span>
          <Link href="/">&larr; Solvimate Home</Link>
        </FooterLinkContainer>
      </LoginCard>
    </LoginWrapper>
    </>
  );
}
