import styled from "styled-components";
import Link from "next/link";

export const Page = styled.main`
  min-height: calc(100vh - 72px);
  padding: 154px 20px 56px;
  background: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 700px) {
    padding-top: 54px;
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 960px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const VerificationHeader = styled.header`
  margin-bottom: 16px;
  padding: 22px 24px;
  border: 1px solid ${({ theme }) => (theme.isDark ? 'rgba(55, 251, 137, 0.25)' : theme.border)};
  border-radius: 20px;
  background-color: ${({ theme }) => theme.cardBg};
  box-shadow: ${({ theme }) =>
    theme.isDark
      ? '0 16px 40px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(55, 251, 137, 0.1)'
      : '0 10px 30px rgba(0, 0, 0, 0.06)'};
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 20px 16px;
  }
`;

export const VerificationBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  background-color: ${({ theme }) => (theme.isDark ? 'rgba(255, 78, 104, 0.1)' : 'rgba(255, 78, 104, 0.05)')};
  border: 1px solid ${({ theme }) => (theme.isDark ? 'rgba(255, 78, 104, 0.3)' : 'rgba(255, 78, 104, 0.2)')};
  color: #ff4e68;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

export const PageTitle = styled.h1`
  margin: 10px 0 3px;
  color: ${({ theme }) => theme.foreground};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.55rem, 3vw, 2rem);
  font-weight: 700;
  line-height: 1.15;
`;

export const VerificationId = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.85rem;

  strong {
    color: ${({ theme }) => theme.foreground};
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.85rem;
  }
`;

export const InvalidCard = styled.section`
  padding: 2rem 2.25rem;
  border: 1px solid ${({ theme }) => (theme.isDark ? 'rgba(255, 78, 104, 0.25)' : theme.border)};
  border-radius: 20px;
  background-color: ${({ theme }) => theme.cardBg};
  box-shadow: ${({ theme }) =>
    theme.isDark
      ? '0 16px 40px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 78, 104, 0.1)'
      : '0 10px 30px rgba(255, 78, 104, 0.06)'};
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 1.5rem;
  }
`;

export const InvalidHeading = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`;

export const InvalidIcon = styled.span`
  display: grid;
  width: 24px;
  height: 24px;
  place-items: center;
  color: #ff4e68;
  background: ${({ theme }) => (theme.isDark ? 'rgba(255, 78, 104, 0.1)' : 'rgba(255, 78, 104, 0.05)')};
  border-radius: 6px;

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const InvalidTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.foreground};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.2;
`;

export const InvalidMessage = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.foreground};
  font-size: 0.9rem;
  line-height: 1.6;
`;

export const CardDivider = styled.hr`
  height: 1px;
  margin: 24px 0;
  border: 0;
  background: ${({ theme }) => theme.border};
`;

export const SupportRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;

  @media (max-width: 640px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }
`;

export const SupportText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.85rem;
`;

export const SupportLink = styled(Link)`
  color: ${({ theme }) => (theme.isDark ? '#37fb89' : theme.accentText)};
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

export const ErrorCode = styled.span`
  color: ${({ theme }) => theme.textSecondary};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
  white-space: nowrap;
  padding: 4px 8px;
  background: ${({ theme }) => (theme.isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.02)')};
  border-radius: 4px;
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
`;

const ActionBase = styled(Link)`
  display: inline-flex;
  min-height: 40px;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s ease;
`;

export const HomeLink = styled(ActionBase)`
  border: 1px solid ${({ theme }) => (theme.isDark ? 'rgba(55, 251, 137, 0.28)' : theme.border)};
  color: ${({ theme }) => theme.foreground};
  background: ${({ theme }) => (theme.isDark ? 'rgba(55, 251, 137, 0.18)' : 'rgba(0, 0, 0, 0.03)')};

  &:hover {
    background: ${({ theme }) => (theme.isDark ? 'rgba(55, 251, 137, 0.28)' : 'rgba(0, 0, 0, 0.06)')};
    border-color: ${({ theme }) => (theme.isDark ? '#37fb89' : theme.accentText)};
  }
`;

export const VerifyAgainLink = styled(ActionBase)`
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.textSecondary};
  background: ${({ theme }) => (theme.isDark ? 'rgba(0, 30, 43, 0.28)' : 'transparent')};

  &:hover {
    border-color: ${({ theme }) => (theme.isDark ? '#befe72' : theme.accentText)};
    color: ${({ theme }) => theme.foreground};
  }
`;

export const FooterNote = styled.p`
  margin: 32px 0 0;
  color: ${({ theme }) => theme.textSecondary};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.75rem;
  text-align: center;
  opacity: 0.7;
`;
