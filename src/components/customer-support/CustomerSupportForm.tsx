'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/hooks/useToast';

const FormWrapper = styled.section`
  width: 100%;
  padding: 2rem 1.5rem 6.5rem;
  background: ${({ theme }) => theme.background};

  @media (max-width: 768px) {
    padding: 1.5rem 1rem 5rem;
  }
`;

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 3rem 3.5rem;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.08);

  @media (max-width: 640px) {
    padding: 2.25rem 1.5rem;
  }
`;

const TitleText = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.75rem, 3vw, 2.35rem);
  font-weight: 800;
  color: ${({ theme }) => theme.foreground};
  margin: 0 0 2rem;
  text-align: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const LabelText = styled.label`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.95rem;
  font-weight: 700;
  color: ${({ theme }) => theme.foreground};
`;

const StyledInput = styled.input<{ $hasError?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.body};
  width: 100%;
  padding: 0.9rem 1.15rem;
  border-radius: 12px;
  border: 1px solid
    ${({ $hasError, theme }) => ($hasError ? '#ef4444' : theme.border)};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.foreground};
  font-size: 0.95rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ $hasError, theme }) => ($hasError ? '#ef4444' : theme.primary)};
    box-shadow: 0 0 0 3px
      ${({ $hasError }) =>
        $hasError ? 'rgba(239, 68, 68, 0.18)' : 'rgba(190, 254, 114, 0.25)'};
  }

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
    opacity: 0.7;
  }
`;

const StyledTextArea = styled.textarea<{ $hasError?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.body};
  width: 100%;
  min-height: 160px;
  padding: 0.9rem 1.15rem;
  border-radius: 12px;
  border: 1px solid
    ${({ $hasError, theme }) => ($hasError ? '#ef4444' : theme.border)};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.foreground};
  font-size: 0.95rem;
  resize: vertical;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ $hasError, theme }) => ($hasError ? '#ef4444' : theme.primary)};
    box-shadow: 0 0 0 3px
      ${({ $hasError }) =>
        $hasError ? 'rgba(239, 68, 68, 0.18)' : 'rgba(190, 254, 114, 0.25)'};
  }

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
    opacity: 0.7;
  }
`;

const ErrorText = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.8125rem;
  color: #ef4444;
  font-weight: 600;
`;

const FooterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const CharCounter = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const SubmitButton = styled.button`
  font-family: ${({ theme }) => theme.fonts.body};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.95rem 2.5rem;
  border-radius: 9999px;
  border: none;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.colors.ink};
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease,
    opacity 0.2s ease;
  box-shadow: 0 6px 20px rgba(190, 254, 114, 0.35);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    background: ${({ theme }) => theme.primaryHover};
    box-shadow: 0 8px 25px rgba(190, 254, 114, 0.5);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const HoneypotInput = styled.input`
  display: none !important;
  visibility: hidden;
  position: absolute;
  left: -9999px;
`;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
}

export default function CustomerSupportForm() {
  const { t } = useLanguage();
  const toast = useToast();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Project enquiry');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Read optional ?subject=... query parameter on mount (e.g. from Apply Now buttons)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const querySubject = new URLSearchParams(window.location.search).get('subject');
      if (querySubject && querySubject.trim()) {
        const title = querySubject.trim();
        const timer = setTimeout(() => {
          setSubject(title);
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = t('customer_support.first_name_error');
    }

    if (!lastName.trim()) {
      newErrors.lastName = t('customer_support.last_name_error');
    }

    if (!email.trim()) {
      newErrors.email = t('customer_support.email_error_required');
    } else if (!EMAIL_REGEX.test(email.trim())) {
      newErrors.email = t('customer_support.email_error_invalid');
    }

    if (!message.trim()) {
      newErrors.message = t('customer_support.message_error');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const fullName = `${firstName.trim()} ${lastName.trim()}`;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fullName,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          subject: subject ? subject.trim() : 'Project enquiry',
          message: message.trim(),
          _honeypot: honeypot,
          source: 'customer_form',
        }),
      });

      if (res.ok) {
        // Spec requirement: Success toast copy matches "Message sent successfully."
        toast.success(t('customer_support.success_toast') || 'Message sent successfully.');
        setFirstName('');
        setLastName('');
        setEmail('');
        setSubject('Project enquiry');
        setMessage('');
        setHoneypot('');
        setErrors({});
      } else {
        toast.error(t('customer_support.error_toast'));
      }
    } catch {
      toast.error(t('customer_support.error_toast'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormWrapper>
      <FormContainer data-gsap="card">
        <TitleText>{t('customer_support.form_title')}</TitleText>

        <StyledForm onSubmit={handleSubmit} noValidate>
          {/* Honeypot field */}
          <HoneypotInput
            type="text"
            name="_honeypot"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <FieldRow>
            <FieldGroup>
              <LabelText htmlFor="customer-first-name">
                {t('customer_support.first_name_label')}
              </LabelText>
              <StyledInput
                id="customer-first-name"
                type="text"
                placeholder={t('customer_support.first_name_placeholder')}
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  if (errors.firstName) {
                    setErrors((prev) => ({ ...prev, firstName: undefined }));
                  }
                }}
                $hasError={Boolean(errors.firstName)}
                aria-invalid={Boolean(errors.firstName)}
                aria-describedby={
                  errors.firstName ? 'customer-first-name-error' : undefined
                }
              />
              {errors.firstName && (
                <ErrorText id="customer-first-name-error" role="alert">
                  {errors.firstName}
                </ErrorText>
              )}
            </FieldGroup>

            <FieldGroup>
              <LabelText htmlFor="customer-last-name">
                {t('customer_support.last_name_label')}
              </LabelText>
              <StyledInput
                id="customer-last-name"
                type="text"
                placeholder={t('customer_support.last_name_placeholder')}
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  if (errors.lastName) {
                    setErrors((prev) => ({ ...prev, lastName: undefined }));
                  }
                }}
                $hasError={Boolean(errors.lastName)}
                aria-invalid={Boolean(errors.lastName)}
                aria-describedby={
                  errors.lastName ? 'customer-last-name-error' : undefined
                }
              />
              {errors.lastName && (
                <ErrorText id="customer-last-name-error" role="alert">
                  {errors.lastName}
                </ErrorText>
              )}
            </FieldGroup>
          </FieldRow>

          <FieldRow>
            <FieldGroup>
              <LabelText htmlFor="customer-email">
                {t('customer_support.email_label')}
              </LabelText>
              <StyledInput
                id="customer-email"
                type="email"
                placeholder={t('customer_support.email_placeholder')}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors((prev) => ({ ...prev, email: undefined }));
                  }
                }}
                $hasError={Boolean(errors.email)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'customer-email-error' : undefined}
              />
              {errors.email && (
                <ErrorText id="customer-email-error" role="alert">
                  {errors.email}
                </ErrorText>
              )}
            </FieldGroup>

            <FieldGroup>
              <LabelText htmlFor="customer-subject">
                {t('customer_support.subject_label')}
              </LabelText>
              <StyledInput
                id="customer-subject"
                type="text"
                placeholder={t('customer_support.subject_default')}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </FieldGroup>
          </FieldRow>

          <FieldGroup>
            <LabelText htmlFor="customer-message">
              {t('customer_support.message_label')}
            </LabelText>
            <StyledTextArea
              id="customer-message"
              maxLength={2000}
              placeholder={t('customer_support.message_placeholder')}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (errors.message) {
                  setErrors((prev) => ({ ...prev, message: undefined }));
                }
              }}
              $hasError={Boolean(errors.message)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={
                errors.message ? 'customer-message-error' : undefined
              }
            />
            {errors.message && (
              <ErrorText id="customer-message-error" role="alert">
                {errors.message}
              </ErrorText>
            )}
          </FieldGroup>

          <FooterRow>
            <CharCounter>{message.length} / 2000</CharCounter>

            <SubmitButton
              type="submit"
              disabled={isSubmitting}
              aria-disabled={isSubmitting}
            >
              {isSubmitting
                ? t('customer_support.submitting_button')
                : t('customer_support.submit_button')}
            </SubmitButton>
          </FooterRow>
        </StyledForm>
      </FormContainer>
    </FormWrapper>
  );
}
