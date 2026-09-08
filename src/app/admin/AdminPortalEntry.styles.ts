import styled from 'styled-components';

export const SectionWrapper = styled.section`
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

export const PageContainer = styled.div`
  width: 100%;
  max-width: 1080px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const HeaderCard = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => (theme.isDark ? 'rgba(55, 251, 137, 0.25)' : theme.border)};
  border-radius: 20px;
  padding: 2.5rem 2.75rem;
  box-shadow: ${({ theme }) =>
    theme.isDark
      ? '0 16px 40px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(55, 251, 137, 0.1)'
      : '0 10px 30px rgba(0, 0, 0, 0.06)'};
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 1.75rem 1.5rem;
  }
`;

export const PillBadge = styled.div`
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

  svg {
    width: 13px;
    height: 13px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2.2;
  }
`;

export const MainHeading = styled.h1`
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

export const HeaderSubtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.98rem;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
  line-height: 1.6;
  max-width: 860px;
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 1.5rem;
  width: 100%;

  @media (max-width: 868px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => (theme.isDark ? 'rgba(55, 251, 137, 0.25)' : theme.border)};
  border-radius: 20px;
  padding: 2.25rem;
  box-shadow: ${({ theme }) =>
    theme.isDark
      ? '0 16px 40px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(55, 251, 137, 0.1)'
      : '0 10px 30px rgba(0, 0, 0, 0.06)'};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 1.75rem 1.5rem;
  }
`;

export const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.45rem;
  font-weight: 700;
  color: ${({ theme }) => theme.foreground};
  margin: 0 0 0.5rem 0;
  line-height: 1.25;
`;

export const SectionSubtext = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.92rem;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0 0 1.5rem 0;
  line-height: 1.55;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  width: 100%;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  width: 100%;
`;

export const FieldLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.86rem;
  font-weight: 600;
  color: ${({ theme }) => theme.foreground};
  letter-spacing: 0.01em;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  background-color: ${({ theme }) => (theme.isDark ? 'rgba(0, 30, 43, 0.6)' : '#ffffff')};
  border: 1px solid
    ${({ theme }) => (theme.isDark ? 'rgba(55, 251, 137, 0.3)' : 'rgba(0, 0, 0, 0.15)')};
  color: ${({ theme }) => theme.foreground};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.95rem;
  outline: none;
  box-sizing: border-box;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:focus {
    border-color: #37fb89;
    box-shadow: 0 0 0 3px
      ${({ theme }) => (theme.isDark ? 'rgba(55, 251, 137, 0.2)' : 'rgba(55, 251, 137, 0.3)')};
  }

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
    opacity: 0.6;
  }
`;

export const SubmitButton = styled.button`
  margin-top: 0.5rem;
  width: 100%;
  padding: 0.9rem 1.5rem;
  border-radius: 12px;
  background-color: ${({ theme }) => (theme.isDark ? '#BEFE72' : '#001E2B')};
  color: ${({ theme }) => (theme.isDark ? '#001E2B' : '#ffffff')};
  border: none;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition:
    transform 0.15s ease,
    background-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => (theme.isDark ? '#37FB89' : '#0A2E3D')};
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(55, 251, 137, 0.25);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 16px;
    height: 16px;
    stroke: currentColor;
    fill: none;
    stroke-width: 2.4;
  }
`;

export const SecurityNote = styled.div`
  margin-top: 1.25rem;
  padding: 0.85rem 1rem;
  border-radius: 10px;
  background-color: ${({ theme }) =>
    theme.isDark ? 'rgba(55, 251, 137, 0.08)' : 'rgba(0, 30, 43, 0.04)'};
  border: 1px solid
    ${({ theme }) => (theme.isDark ? 'rgba(55, 251, 137, 0.2)' : 'rgba(0, 30, 43, 0.1)')};
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;

  svg {
    width: 16px;
    height: 16px;
    color: ${({ theme }) => (theme.isDark ? '#BEFE72' : theme.accentText)};
    flex-shrink: 0;
    margin-top: 2px;
    stroke: currentColor;
    fill: none;
    stroke-width: 2;
  }

  p {
    margin: 0;
    font-size: 0.82rem;
    line-height: 1.45;
    color: ${({ theme }) => theme.textSecondary};
  }
`;

export const CapabilitiesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
`;

export const CapabilityItem = styled.div`
  padding: 1rem 1.15rem;
  border-radius: 12px;
  background-color: ${({ theme }) =>
    theme.isDark ? 'rgba(10, 46, 61, 0.4)' : 'rgba(0, 30, 43, 0.02)'};
  border: 1px solid
    ${({ theme }) => (theme.isDark ? 'rgba(55, 251, 137, 0.18)' : 'rgba(0, 0, 0, 0.08)')};
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) =>
      theme.isDark ? 'rgba(190, 254, 114, 0.4)' : 'rgba(55, 251, 137, 0.4)'};
  }
`;

export const CapabilityIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: ${({ theme }) =>
    theme.isDark ? 'rgba(55, 251, 137, 0.12)' : 'rgba(0, 30, 43, 0.06)'};
  color: ${({ theme }) => (theme.isDark ? '#BEFE72' : theme.accentText)};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 16px;
    height: 16px;
    stroke: currentColor;
    fill: none;
    stroke-width: 2;
  }
`;

export const CapabilityContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const CapabilityTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 0.95rem;
  font-weight: 600;
  color: ${({ theme }) => theme.foreground};
  margin: 0;
`;

export const CapabilityDesc = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.82rem;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
  line-height: 1.45;
`;
