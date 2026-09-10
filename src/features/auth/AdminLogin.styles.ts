import styled, { keyframes } from 'styled-components';

const pulseGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 12px rgba(55, 251, 137, 0.25);
  }
  50% {
    box-shadow: 0 0 24px rgba(55, 251, 137, 0.45);
  }
`;

export const FixedBackgroundGlobe = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.6; /* Slightly lower opacity for login focus */

  @media (max-width: 768px) {
    top: -10vh;
  }
`;

export const LoginWrapper = styled.section`
  width: 100%;
  min-height: calc(100vh - 180px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem 5rem;
  box-sizing: border-box;
  position: relative;
  z-index: 1;

  @media (max-width: 640px) {
    padding: 1.5rem 1rem 3rem;
  }
`;

export const LoginCard = styled.div`
  width: 100%;
  max-width: 460px;
  background-color: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => (theme.isDark ? 'rgba(55, 251, 137, 0.22)' : theme.border)};
  border-radius: 20px;
  padding: 2.75rem 2.25rem;
  box-shadow: ${({ theme }) =>
    theme.isDark
      ? '0 24px 50px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(55, 251, 137, 0.08)'
      : '0 12px 36px rgba(0, 0, 0, 0.08)'};
  box-sizing: border-box;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  @media (max-width: 480px) {
    padding: 2rem 1.5rem;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 2rem;
`;

export const BadgePill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.accentBadgeBg};
  border: 1px solid ${({ theme }) => theme.accentBadgeBorder};
  color: ${({ theme }) => (theme.isDark ? '#BEFE72' : theme.accentText)};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 1rem;

  svg {
    width: 14px;
    height: 14px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2.2;
  }
`;

export const StatusDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #37fb89;
  box-shadow: 0 0 8px #37fb89;
`;

export const Heading = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.85rem;
  font-weight: 700;
  color: ${({ theme }) => theme.foreground};
  margin: 0 0 0.5rem;
  letter-spacing: -0.01em;

  @media (max-width: 480px) {
    font-size: 1.55rem;
  }
`;

export const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.92rem;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
  line-height: 1.5;
`;

export const StepTracker = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
  width: 100%;
`;

export const StepItem = styled.div<{ $active: boolean; $completed: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ $active, $completed, theme }) =>
    $active
      ? theme.isDark
        ? '#BEFE72'
        : theme.accentText
      : $completed
      ? '#37FB89'
      : theme.textSecondary};
`;

export const StepNumber = styled.span<{ $active: boolean; $completed: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  font-weight: 700;
  background-color: ${({ $active, $completed, theme }) =>
    $active
      ? theme.isDark
        ? '#BEFE72'
        : theme.primary
      : $completed
      ? '#37FB89'
      : 'rgba(159, 184, 180, 0.15)'};
  color: ${({ $active, $completed }) =>
    $active || $completed ? '#001E2B' : 'inherit'};
`;

export const StepDivider = styled.div<{ $completed: boolean }>`
  height: 2px;
  width: 32px;
  background-color: ${({ $completed }) =>
    $completed ? '#37FB89' : 'rgba(159, 184, 180, 0.25)'};
  border-radius: 1px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.35rem;
  width: 100%;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 0.82rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

export const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  display: flex;
  align-items: center;
  pointer-events: none;
  color: ${({ theme }) => theme.textSecondary};

  svg {
    width: 18px;
    height: 18px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
  }
`;

export const Input = styled.input<{ $hasIcon?: boolean }>`
  width: 100%;
  padding: 0.85rem 1rem;
  padding-left: ${({ $hasIcon }) => ($hasIcon ? '2.85rem' : '1rem')};
  background-color: ${({ theme }) =>
    theme.isDark ? 'rgba(0, 30, 43, 0.65)' : 'rgba(255, 255, 255, 0.9)'};
  border: 1px solid ${({ theme }) => (theme.isDark ? 'rgba(159, 184, 180, 0.25)' : theme.border)};
  border-radius: 10px;
  color: ${({ theme }) => theme.foreground};
  font-size: 0.95rem;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;

  &::placeholder {
    color: ${({ theme }) => (theme.isDark ? 'rgba(159, 184, 180, 0.5)' : '#9ca3af')};
  }

  &:focus {
    outline: none;
    border-color: #37fb89;
    box-shadow: 0 0 0 3px rgba(55, 251, 137, 0.22);
    background-color: ${({ theme }) =>
      theme.isDark ? 'rgba(0, 30, 43, 0.9)' : '#ffffff'};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const OtpInput = styled.input`
  width: 100%;
  padding: 1.1rem 1rem;
  background-color: ${({ theme }) =>
    theme.isDark ? 'rgba(0, 30, 43, 0.85)' : 'rgba(249, 250, 251, 0.9)'};
  border: 2px solid ${({ theme }) => (theme.isDark ? 'rgba(55, 251, 137, 0.35)' : '#0F7A4D')};
  border-radius: 12px;
  color: ${({ theme }) => (theme.isDark ? '#BEFE72' : '#047857')};
  font-family: 'Courier New', Courier, monospace;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0.6em;
  text-align: center;
  box-sizing: border-box;
  transition: all 0.25s ease-in-out;

  &:focus {
    outline: none;
    border-color: #37fb89;
    animation: ${pulseGlow} 2s infinite ease-in-out;
  }

  &::placeholder {
    letter-spacing: 0.3em;
    color: rgba(159, 184, 180, 0.3);
  }
`;

export const Button = styled.button<{ $variant?: 'primary' | 'secondary' | 'ghost' }>`
  width: 100%;
  padding: 0.9rem 1.5rem;
  border-radius: 10px;
  font-size: 0.98rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  transition: all 0.25s ease;
  box-sizing: border-box;

  ${({ $variant, theme }) => {
    if ($variant === 'secondary') {
      return `
        background-color: transparent;
        border: 1px solid rgba(159, 184, 180, 0.3);
        color: ${theme.foreground};
        &:hover:not(:disabled) {
          background-color: rgba(159, 184, 180, 0.1);
          border-color: rgba(159, 184, 180, 0.5);
        }
      `;
    }
    if ($variant === 'ghost') {
      return `
        background-color: transparent;
        border: none;
        color: ${theme.textSecondary};
        padding: 0.5rem;
        font-size: 0.85rem;
        font-weight: 600;
        &:hover:not(:disabled) {
          color: ${theme.foreground};
          text-decoration: underline;
        }
      `;
    }
    // Default primary
    return `
      background: linear-gradient(135deg, #BEFE72 0%, #37FB89 100%);
      border: none;
      color: #001E2B;
      box-shadow: 0 4px 16px rgba(55, 251, 137, 0.25);
      &:hover:not(:disabled) {
        transform: translateY(-1px);
        box-shadow: 0 6px 20px rgba(55, 251, 137, 0.38);
      }
      &:active:not(:disabled) {
        transform: translateY(0);
      }
    `;
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const AlertBox = styled.div<{ $type: 'error' | 'info' | 'success' }>`
  width: 100%;
  padding: 0.85rem 1rem;
  border-radius: 10px;
  font-size: 0.88rem;
  line-height: 1.45;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;

  ${({ $type, theme }) => {
    if ($type === 'error') {
      return `
        background-color: rgba(239, 68, 68, 0.12);
        border: 1px solid rgba(239, 68, 68, 0.35);
        color: ${theme.isDark ? '#FCA5A5' : '#DC2626'};
      `;
    }
    if ($type === 'success') {
      return `
        background-color: rgba(55, 251, 137, 0.12);
        border: 1px solid rgba(55, 251, 137, 0.35);
        color: ${theme.isDark ? '#37FB89' : '#0F7A4D'};
      `;
    }
    // info
    return `
      background-color: rgba(14, 165, 233, 0.12);
      border: 1px solid rgba(14, 165, 233, 0.35);
      color: ${theme.isDark ? '#7DD3FC' : '#0284C7'};
    `;
  }}

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    margin-top: 1px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
  }
`;

export const ResendRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: -0.25rem;
  font-size: 0.82rem;
  color: ${({ theme }) => theme.textSecondary};
`;

export const ResendButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  color: ${({ theme }) => (theme.isDark ? '#BEFE72' : theme.accentText)};
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.2s ease;

  &:hover:not(:disabled) {
    color: #37fb89;
  }

  &:disabled {
    color: ${({ theme }) => theme.textSecondary};
    opacity: 0.5;
    cursor: not-allowed;
    text-decoration: none;
  }
`;

export const FooterLinkContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.82rem;
  color: ${({ theme }) => theme.textSecondary};

  a {
    color: ${({ theme }) => (theme.isDark ? '#BEFE72' : theme.accentText)};
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s ease;

    &:hover {
      text-decoration: underline;
      color: #37fb89;
    }
  }
`;

export const Spinner = styled.span`
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  display: inline-block;
  animation: spin 0.75s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
