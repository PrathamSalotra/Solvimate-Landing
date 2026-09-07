'use client';

import React, { useState } from 'react';
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
} from './ContactForm.styles';

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
              <LabelText htmlFor="contact-name">{t('contact_page.name_label')}</LabelText>
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
              <LabelText htmlFor="contact-phone">{t('contact_page.phone_input_label')}</LabelText>
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
              <LabelText htmlFor="contact-email">{t('contact_page.email_input_label')}</LabelText>
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
              <LabelText htmlFor="contact-subject">{t('contact_page.subject_label')}</LabelText>
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
            <LabelText htmlFor="contact-message">{t('contact_page.message_label')}</LabelText>
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

            <SubmitButton type="submit" disabled={isSubmitting} aria-disabled={isSubmitting}>
              {isSubmitting ? t('contact_page.submitting_button') : t('contact_page.submit_button')}
            </SubmitButton>
          </FooterRow>
        </StyledForm>
      </FormContainer>
    </FormWrapper>
  );
}
