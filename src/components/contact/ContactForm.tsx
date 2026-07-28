'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/hooks/useToast';

const FormWrapper = styled.section`
  width: 100%;
  padding: 3rem 1.5rem 6.5rem;
  background: ${({ theme }) => theme.background};

  @media (max-width: 768px) {
    padding: 2.5rem 1rem 5rem;
  }
`;

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 24px;
  padding: 3rem 3.5rem;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.08);

  @media (max-width: 640px) {
    padding: 2.25rem 1.5rem;
  }
`;

const TitleText = styled.h2`
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

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const LabelText = styled.label`
  font-size: 0.95rem;
  font-weight: 700;
  color: ${({ theme }) => theme.foreground};
`;

const StyledInput = styled.input<{ $hasError?: boolean }>`
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
        $hasError ? 'rgba(239, 68, 68, 0.18)' : 'rgba(16, 185, 129, 0.18)'};
  }

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
    opacity: 0.7;
  }
`;

const StyledTextArea = styled.textarea<{ $hasError?: boolean }>`
  width: 100%;
  min-height: 160px;
  padding: 0.9rem 1.15rem;
  border-radius: 12px;
  border: 1px solid
    ${({ $hasError, theme }) => ($hasError ? '#ef4444' : theme.border)};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.foreground};
  font-size: 0.95rem;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ $hasError, theme }) => ($hasError ? '#ef4444' : theme.primary)};
    box-shadow: 0 0 0 3px
      ${({ $hasError }) =>
        $hasError ? 'rgba(239, 68, 68, 0.18)' : 'rgba(16, 185, 129, 0.18)'};
  }

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
    opacity: 0.7;
  }
`;

const ErrorText = styled.span`
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
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.textSecondary};
  font-family: monospace;
`;

const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.95rem 2.5rem;
  border-radius: 9999px;
  border: none;
  background: ${({ theme }) => theme.primary};
  color: #ffffff;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease,
    opacity 0.2s ease;
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.35);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    background: ${({ theme }) => theme.primaryHover};
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.5);
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
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const { t } = useLanguage();
  const toast = useToast();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Project enquiry');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = t('contact_page.name_error');
    }

    if (!email.trim()) {
      newErrors.email = t('contact_page.email_error_required');
    } else if (!EMAIL_REGEX.test(email.trim())) {
      newErrors.email = t('contact_page.email_error_invalid');
    }

    if (!message.trim()) {
      newErrors.message = t('contact_page.message_error');
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

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone ? phone.trim() : '',
          email: email.trim(),
          subject: subject ? subject.trim() : 'Project enquiry',
          message: message.trim(),
          _honeypot: honeypot,
        }),
      });

      if (res.ok) {
        toast.success(t('contact_page.success_toast'));
        setName('');
        setPhone('');
        setEmail('');
        setSubject('Project enquiry');
        setMessage('');
        setHoneypot('');
        setErrors({});
      } else {
        toast.error(t('contact_page.error_toast'));
      }
    } catch {
      toast.error(t('contact_page.error_toast'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormWrapper>
      <FormContainer data-gsap="card">
        <TitleText>{t('contact_page.form_title')}</TitleText>

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
              <LabelText htmlFor="contact-name">
                {t('contact_page.name_label')}
              </LabelText>
              <StyledInput
                id="contact-name"
                type="text"
                placeholder={t('contact_page.name_placeholder')}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                $hasError={Boolean(errors.name)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
              />
              {errors.name && (
                <ErrorText id="contact-name-error" role="alert">
                  {errors.name}
                </ErrorText>
              )}
            </FieldGroup>

            <FieldGroup>
              <LabelText htmlFor="contact-phone">
                {t('contact_page.phone_input_label')}
              </LabelText>
              <StyledInput
                id="contact-phone"
                type="tel"
                placeholder={t('contact_page.phone_placeholder')}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </FieldGroup>
          </FieldRow>

          <FieldRow>
            <FieldGroup>
              <LabelText htmlFor="contact-email">
                {t('contact_page.email_input_label')}
              </LabelText>
              <StyledInput
                id="contact-email"
                type="email"
                placeholder={t('contact_page.email_placeholder')}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                $hasError={Boolean(errors.email)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'contact-email-error' : undefined}
              />
              {errors.email && (
                <ErrorText id="contact-email-error" role="alert">
                  {errors.email}
                </ErrorText>
              )}
            </FieldGroup>

            <FieldGroup>
              <LabelText htmlFor="contact-subject">
                {t('contact_page.subject_label')}
              </LabelText>
              <StyledInput
                id="contact-subject"
                type="text"
                placeholder={t('contact_page.subject_default')}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </FieldGroup>
          </FieldRow>

          <FieldGroup>
            <LabelText htmlFor="contact-message">
              {t('contact_page.message_label')}
            </LabelText>
            <StyledTextArea
              id="contact-message"
              maxLength={2000}
              placeholder={t('contact_page.message_placeholder')}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
              }}
              $hasError={Boolean(errors.message)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
            />
            {errors.message && (
              <ErrorText id="contact-message-error" role="alert">
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
                ? t('contact_page.submitting_button')
                : t('contact_page.submit_button')}
            </SubmitButton>
          </FooterRow>
        </StyledForm>
      </FormContainer>
    </FormWrapper>
  );
}
