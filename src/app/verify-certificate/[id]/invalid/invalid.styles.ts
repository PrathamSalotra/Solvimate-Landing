import styled from "styled-components";
import Link from "next/link";

export const Page = styled.main`
  min-height: calc(100vh - 72px);
  padding: 154px 20px 56px;
  background: var(--background);
  background-image: linear-gradient(90deg, transparent 0, rgba(55, 251, 137, 0.035) 50%, transparent 100%), linear-gradient(165deg, transparent 42%, rgba(55, 251, 137, 0.09) 42.1%, transparent 42.3%);

  @media (max-width: 700px) {
    padding-top: 54px;
  }
`;

export const Container = styled.div`
  width: min(100%, 960px);
  margin: 0 auto;
`;

export const VerificationHeader = styled.header`
  margin-bottom: 16px;
  padding: 24px;
  border: 1px solid rgba(55, 251, 137, 0.14);
  border-radius: 10px;
  background: rgba(10, 46, 61, 0.72);

  @media (max-width: 560px) {
    padding: 20px 16px;
  }
`;

export const VerificationBadge = styled.span`
  display: inline-flex;
  padding: 4px 10px;
  border: 1px solid rgba(159, 184, 180, 0.3);
  border-radius: 999px;
  color: var(--paper);
  background: rgba(159, 184, 180, 0.08);
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.05em;
`;

export const PageTitle = styled.h1`
  margin: 11px 0 5px;
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

export const InvalidCard = styled.section`
  padding: 26px 24px 24px;
  border: 1px solid rgba(55, 251, 137, 0.14);
  border-radius: 10px;
  background: rgba(10, 46, 61, 0.78);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.16);

  @media (max-width: 560px) {
    padding: 22px 16px;
  }
`;

export const InvalidHeading = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  margin-bottom: 21px;
`;

export const InvalidIcon = styled.span`
  display: grid;
  width: 17px;
  height: 17px;
  place-items: center;
  color: #ff4e68;

  svg {
    width: 17px;
    height: 17px;
  }
`;

export const InvalidTitle = styled.h2`
  margin: 0;
  color: var(--paper);
  font-family: var(--font-display);
  font-size: 1.1rem;
  line-height: 1.2;
`;

export const InvalidMessage = styled.p`
  margin: 0;
  color: var(--paper);
  font-size: 0.76rem;
  line-height: 1.5;
`;

export const CardDivider = styled.hr`
  height: 1px;
  margin: 19px 0 15px;
  border: 0;
  background: rgba(159, 184, 180, 0.1);
`;

export const SupportRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;

  @media (max-width: 640px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }
`;

export const SupportText = styled.p`
  margin: 0;
  color: var(--mist);
  font-size: 0.62rem;
`;

export const SupportLink = styled(Link)`
  color: var(--lime);

  &:hover {
    color: var(--mint);
    text-decoration: underline;
  }
`;

export const ErrorCode = styled.span`
  color: rgba(159, 184, 180, 0.7);
  font-family: var(--font-mono);
  font-size: 0.58rem;
  white-space: nowrap;
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: 18px;
`;

const ActionBase = styled(Link)`
  display: inline-flex;
  min-height: 32px;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  border-radius: 5px;
  font-size: 0.64rem;
  font-weight: 600;
  transition: background 180ms ease, border-color 180ms ease;
`;

export const HomeLink = styled(ActionBase)`
  border: 1px solid rgba(55, 251, 137, 0.28);
  color: var(--paper);
  background: rgba(55, 251, 137, 0.18);

  &:hover {
    background: rgba(55, 251, 137, 0.28);
  }
`;

export const VerifyAgainLink = styled(ActionBase)`
  border: 1px solid rgba(159, 184, 180, 0.2);
  color: var(--mist);
  background: rgba(0, 30, 43, 0.28);

  &:hover {
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
