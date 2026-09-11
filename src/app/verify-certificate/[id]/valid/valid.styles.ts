import styled from "styled-components";

export const Page = styled.main`
  min-height: calc(100vh - 72px);
  padding: 34px 20px 56px;
  background: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 24px 16px 48px;
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 980px;
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
  background-color: ${({ theme }) => theme.accentBadgeBg};
  border: 1px solid ${({ theme }) => theme.accentBadgeBorder};
  color: ${({ theme }) => (theme.isDark ? '#BEFE72' : theme.accentText)};
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

export const CertificateCard = styled.article`
  padding: 2rem 2.25rem;
  border: 1px solid ${({ theme }) => (theme.isDark ? 'rgba(55, 251, 137, 0.25)' : theme.border)};
  border-radius: 20px;
  background-color: ${({ theme }) => theme.cardBg};
  box-shadow: ${({ theme }) =>
    theme.isDark
      ? '0 16px 40px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(55, 251, 137, 0.1)'
      : '0 10px 30px rgba(0, 0, 0, 0.06)'};
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 1.5rem;
  }
`;

export const CardHeading = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 23px;
`;

export const ValidIcon = styled.span`
  display: grid;
  width: 24px;
  height: 24px;
  place-items: center;
  border-radius: 6px;
  color: #001e2b;
  background: #37fb89;

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const ValidTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => (theme.isDark ? '#37fb89' : theme.accentText)};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.02em;
`;

export const IdentityRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Avatar = styled.div<{ $hasPhoto: boolean }>`
  display: grid;
  width: 48px;
  height: 48px;
  flex: 0 0 48px;
  place-items: center;
  overflow: hidden;
  border-radius: 12px;
  color: ${({ theme }) => theme.foreground};
  background: ${({ theme }) => (theme.isDark ? 'rgba(55, 251, 137, 0.15)' : 'rgba(15, 122, 77, 0.1)')};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  font-weight: 700;
  border: 1px solid ${({ theme }) => (theme.isDark ? 'rgba(55, 251, 137, 0.25)' : 'rgba(15, 122, 77, 0.2)')};

  ${({ $hasPhoto }) => $hasPhoto && `img { width: 100%; height: 100%; object-fit: cover; }`}
`;

export const IdentityDetails = styled.div`
  min-width: 0;
`;

export const CandidateName = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.foreground};
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.4rem;
  line-height: 1.2;
`;

export const CandidateMeta = styled.p`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin: 4px 0 0;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.85rem;
`;

export const MetaSeparator = styled.span`
  color: ${({ theme }) => (theme.isDark ? '#37fb89' : theme.accentText)};
`;

export const Description = styled.p`
  margin: 20px 0;
  padding-left: 16px;
  border-left: 2px solid ${({ theme }) => (theme.isDark ? '#37fb89' : theme.accentText)};
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.9rem;
  line-height: 1.6;
`;

export const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const DetailItem = styled.div`
  min-width: 0;
  padding: 14px 16px;
  border: 1px solid ${({ theme }) => (theme.isDark ? 'rgba(55, 251, 137, 0.15)' : theme.border)};
  border-radius: 14px;
  background: ${({ theme }) => (theme.isDark ? 'rgba(0, 0, 0, 0.18)' : 'rgba(0, 0, 0, 0.02)')};
`;

export const DetailLabel = styled.p`
  margin: 0 0 6px;
  color: ${({ theme }) => theme.textSecondary};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.65rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

export const DetailValue = styled.p`
  overflow: hidden;
  margin: 0;
  color: ${({ theme }) => theme.foreground};
  font-size: 0.85rem;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ActiveValue = styled(DetailValue)`
  color: ${({ theme }) => (theme.isDark ? '#37fb89' : theme.accentText)};
`;

export const BadgesSection = styled.div`
  margin-top: 24px;
`;

export const BadgesLabel = styled.p`
  margin: 0 0 10px;
  color: ${({ theme }) => theme.foreground};
  font-size: 0.85rem;
  font-weight: 600;
`;

export const BadgeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Badge = styled.span`
  padding: 6px 12px;
  border: 1px solid ${({ theme }) => (theme.isDark ? 'rgba(55, 251, 137, 0.25)' : theme.accentBadgeBorder)};
  border-radius: 999px;
  color: ${({ theme }) => (theme.isDark ? '#37fb89' : theme.accentText)};
  background: ${({ theme }) => (theme.isDark ? 'rgba(55, 251, 137, 0.08)' : theme.accentBadgeBg)};
  font-size: 0.7rem;
  font-weight: 600;
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 24px;
`;

export const ActionLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 16px;
  border: 1px solid ${({ theme }) => (theme.isDark ? 'rgba(55, 251, 137, 0.25)' : theme.border)};
  border-radius: 8px;
  color: ${({ theme }) => theme.foreground};
  background: ${({ theme }) => (theme.isDark ? 'rgba(55, 251, 137, 0.12)' : 'rgba(0, 0, 0, 0.02)')};
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => (theme.isDark ? '#befe72' : theme.accentText)};
    background: ${({ theme }) => (theme.isDark ? 'rgba(55, 251, 137, 0.2)' : 'rgba(0, 0, 0, 0.05)')};
  }
`;

export const CopyButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 16px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  color: ${({ theme }) => theme.textSecondary};
  background: ${({ theme }) => (theme.isDark ? 'rgba(0, 0, 0, 0.25)' : 'transparent')};
  font: inherit;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover,
  &:focus-visible {
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