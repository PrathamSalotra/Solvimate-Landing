import styled, { keyframes, css } from 'styled-components';

export const FormWrapper = styled.section`
  width: 100%;
  padding: 3rem 1.5rem 6.5rem;
  background: ${({ theme }) => theme.background};
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 2.5rem 1rem 5rem;
  }
`;

export const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 3rem 3.5rem;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.08);
  position: relative;
  z-index: 2;

  @media (max-width: 640px) {
    padding: 2.25rem 1.5rem;
  }
`;

export const TitleText = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.75rem, 3vw, 2.35rem);
  font-weight: 500;
  letter-spacing: -0.01em;
  word-spacing: 0.08em;
  color: ${({ theme }) => theme.foreground};
  margin: 0 0 2rem;
  text-align: center;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FieldRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const LabelText = styled.label`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.95rem;
  font-weight: 700;
  color: ${({ theme }) => theme.foreground};
`;

export const StyledInput = styled.input<{ $hasError?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.body};
  width: 100%;
  padding: 0.9rem 1.15rem;
  border-radius: 12px;
  border: 1px solid ${({ $hasError, theme }) => ($hasError ? theme.error : theme.border)};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.foreground};
  font-size: 0.95rem;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ $hasError, theme }) => ($hasError ? theme.error : theme.primary)};
    box-shadow: 0 0 0 3px
      ${({ $hasError }) => ($hasError ? 'rgba(239, 68, 68, 0.18)' : 'rgba(190, 254, 114, 0.25)')};
  }

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
    opacity: 0.7;
  }
`;

export const StyledTextArea = styled.textarea<{ $hasError?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.body};
  width: 100%;
  min-height: 160px;
  padding: 0.9rem 1.15rem;
  border-radius: 12px;
  border: 1px solid ${({ $hasError, theme }) => ($hasError ? theme.error : theme.border)};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.foreground};
  font-size: 0.95rem;
  resize: vertical;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ $hasError, theme }) => ($hasError ? theme.error : theme.primary)};
    box-shadow: 0 0 0 3px
      ${({ $hasError }) => ($hasError ? 'rgba(239, 68, 68, 0.18)' : 'rgba(190, 254, 114, 0.25)')};
  }

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
    opacity: 0.7;
  }
`;

export const ErrorText = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.error};
  font-weight: 600;
`;

export const FooterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const CharCounter = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.textSecondary};
`;

export const SubmitButton = styled.button`
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
  transition:
    transform 0.2s ease,
    background-color 0.2s ease,
    box-shadow 0.2s ease,
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

export const HoneypotInput = styled.input`
  display: none !important;
  visibility: hidden;
  position: absolute;
  left: -9999px;
`;
