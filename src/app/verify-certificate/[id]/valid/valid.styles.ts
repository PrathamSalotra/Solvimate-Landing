import styled from "styled-components";

export const Page = styled.main`
  min-height: calc(100vh - 72px);
  padding: 34px 20px 56px;
  background: var(--background);
  background-image: linear-gradient(90deg, transparent 0, rgba(55, 251, 137, 0.035) 50%, transparent 100%);
`;

export const Container = styled.div`
  width: min(100%, 980px);
  margin: 0 auto;
`;

export const VerificationHeader = styled.header`
  margin-bottom: 16px;
  padding: 22px 24px;
  border: 1px solid rgba(55, 251, 137, 0.14);
  border-radius: 10px;
  background: rgba(10, 46, 61, 0.62);
`;

export const VerificationBadge = styled.span`
  display: inline-flex;
  padding: 4px 9px;
  border: 1px solid rgba(55, 251, 137, 0.3);
  border-radius: 999px;
  color: var(--mint);
  background: rgba(55, 251, 137, 0.08);
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.04em;
`;

export const PageTitle = styled.h1`
  margin: 10px 0 3px;
  color: var(--paper);
  font-family: var(--font-display);
  font-size: clamp(1.55rem, 3vw, 2rem);
  line-height: 1.15;
`;

export const VerificationId = styled.p`
  margin: 0;
  color: var(--mist);
  font-size: 0.72rem;

  strong {
    color: var(--paper);
    font-family: var(--font-mono);
    font-size: 0.68rem;
  }
`;

export const CertificateCard = styled.article`
  padding: 24px 26px 22px;
  border: 1px solid rgba(55, 251, 137, 0.14);
  border-radius: 10px;
  background: rgba(10, 46, 61, 0.74);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.16);

  @media (max-width: 600px) {
    padding: 20px 16px;
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
  width: 18px;
  height: 18px;
  place-items: center;
  border-radius: 3px;
  color: var(--ink);
  background: var(--mint);

  svg {
    width: 13px;
    height: 13px;
  }
`;

export const ValidTitle = styled.h2`
  margin: 0;
  color: var(--mint);
  font-family: var(--font-body);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.02em;
`;

export const IdentityRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Avatar = styled.div<{ $hasPhoto: boolean }>`
  display: grid;
  width: 40px;
  height: 40px;
  flex: 0 0 40px;
  place-items: center;
  overflow: hidden;
  border-radius: 7px;
  color: var(--paper);
  background: rgba(55, 251, 137, 0.15);
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 700;

  ${({ $hasPhoto }) => $hasPhoto && `img { width: 100%; height: 100%; object-fit: cover; }`}
`;

export const IdentityDetails = styled.div`
  min-width: 0;
`;

export const CandidateName = styled.h3`
  margin: 0;
  color: var(--paper);
  font-family: var(--font-display);
  font-size: 1.25rem;
  line-height: 1.15;
`;

export const CandidateMeta = styled.p`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin: 3px 0 0;
  color: var(--mist);
  font-size: 0.7rem;
`;

export const MetaSeparator = styled.span`
  color: var(--mint);
`;

export const Description = styled.p`
  margin: 18px 0 20px;
  padding-left: 12px;
  border-left: 2px solid var(--mint);
  color: var(--mist);
  font-size: 0.7rem;
  line-height: 1.5;
`;

export const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 9px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const DetailItem = styled.div`
  min-width: 0;
  padding: 11px 12px;
  border: 1px solid rgba(55, 251, 137, 0.08);
  border-radius: 7px;
  background: rgba(0, 30, 43, 0.3);
`;

export const DetailLabel = styled.p`
  margin: 0 0 4px;
  color: var(--mist);
  font-family: var(--font-mono);
  font-size: 0.54rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

export const DetailValue = styled.p`
  overflow: hidden;
  margin: 0;
  color: var(--paper);
  font-size: 0.72rem;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ActiveValue = styled(DetailValue)`
  color: var(--mint);
`;

export const BadgesSection = styled.div`
  margin-top: 20px;
`;

export const BadgesLabel = styled.p`
  margin: 0 0 8px;
  color: var(--paper);
  font-size: 0.7rem;
`;

export const BadgeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
`;

export const Badge = styled.span`
  padding: 4px 9px;
  border: 1px solid rgba(55, 251, 137, 0.25);
  border-radius: 999px;
  color: var(--mint);
  background: rgba(55, 251, 137, 0.08);
  font-size: 0.6rem;
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 22px;
`;

export const ActionLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 32px;
  padding: 0 12px;
  border: 1px solid rgba(55, 251, 137, 0.24);
  border-radius: 5px;
  color: var(--paper);
  background: rgba(55, 251, 137, 0.12);
  font-size: 0.64rem;
  font-weight: 600;
  transition: background 180ms ease, border-color 180ms ease;

  &:hover {
    border-color: var(--lime);
    background: rgba(55, 251, 137, 0.2);
  }
`;

export const CopyButton = styled.button`
  min-height: 32px;
  padding: 0 12px;
  border: 1px solid rgba(159, 184, 180, 0.18);
  border-radius: 5px;
  color: var(--mist);
  background: rgba(0, 30, 43, 0.28);
  font: inherit;
  font-size: 0.64rem;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    border-color: var(--lime);
    color: var(--paper);
  }
`;

export const FooterNote = styled.p`
  margin: 26px 0 0;
  color: rgba(159, 184, 180, 0.55);
  font-family: var(--font-mono);
  font-size: 0.58rem;
  text-align: center;
`;