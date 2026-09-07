'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/hooks/useToast';
import {
  FormWrapper,
  FormContainer,
  TitleText,
  StyledForm,
  FieldRow,
  FieldGroup,
  LabelText,
  StyledInput,
  StyledTextArea,
  ErrorText,
  FooterRow,
  CharCounter,
  SubmitButton,
  HoneypotInput,
} from './CustomerSupportForm.styles';

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
                aria-describedby={errors.firstName ? 'customer-first-name-error' : undefined}
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
                aria-describedby={errors.lastName ? 'customer-last-name-error' : undefined}
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
              <LabelText htmlFor="customer-email">{t('customer_support.email_label')}</LabelText>
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
            <LabelText htmlFor="customer-message">{t('customer_support.message_label')}</LabelText>
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
              aria-describedby={errors.message ? 'customer-message-error' : undefined}
            />
            {errors.message && (
              <ErrorText id="customer-message-error" role="alert">
                {errors.message}
              </ErrorText>
            )}
          </FieldGroup>

          <FooterRow>
            <CharCounter>{message.length} / 2000</CharCounter>

            <SubmitButton type="submit" disabled={isSubmitting} aria-disabled={isSubmitting}>
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
