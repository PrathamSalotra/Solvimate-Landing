import styled from "styled-components";

export const AccountLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.8fr) minmax(260px, 1fr);
  gap: 18px;
  margin-bottom: 24px;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

export const SessionCard = styled.section`
  min-width: 0;
  border: 1px solid rgba(55, 251, 137, 0.08);
  border-radius: 10px;
  background: linear-gradient(110deg, rgba(10, 46, 61, 0.98), rgba(10, 46, 61, 0.76));
  padding: 22px;
`;

export const ActionCard = styled(SessionCard)`
  background: rgba(10, 46, 61, 0.82);
`;

export const SessionHeading = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
`;

export const SessionBadge = styled.span<{ $danger?: boolean }>`
  display: grid;
  flex: 0 0 32px;
  width: 32px;
  height: 32px;
  place-items: center;
  border-radius: 7px;
  color: ${({ $danger }) => ($danger ? "#ff9a9a" : "var(--lime)")};
  background: ${({ $danger }) => ($danger ? "rgba(255, 112, 112, 0.08)" : "rgba(55, 251, 137, 0.08)")};

  svg {
    width: 17px;
    height: 17px;
  }
`;

export const SessionTitle = styled.h2`
  margin: 0;
  color: var(--paper);
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
`;

export const ActionTitle = styled(SessionTitle)``;

export const SessionSubtitle = styled.p`
  margin: 2px 0 0;
  color: var(--mist);
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.08em;
`;

export const ActionSubtitle = styled(SessionSubtitle)``;

export const AccountGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px 14px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const AccountItem = styled.div`
  min-width: 0;
  padding: 13px 14px;
  border-radius: 6px;
  background: rgba(0, 30, 43, 0.34);
`;

export const AccountLabel = styled.p`
  margin: 0 0 4px;
  color: var(--mist);
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

export const AccountValue = styled.p`
  overflow: hidden;
  margin: 0;
  color: var(--paper);
  font-size: 0.78rem;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const SecurityNote = styled.div`
  display: grid;
  gap: 5px;
  margin-bottom: 28px;
  padding: 13px;
  border-radius: 6px;
  background: rgba(0, 30, 43, 0.34);

  strong {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #c5e2df;
    font-size: 0.72rem;
  }

  strong svg {
    width: 14px;
    height: 14px;
    color: #c5e2df;
  }

  span {
    padding-left: 22px;
    color: var(--mist);
    font-size: 0.65rem;
    line-height: 1.45;
  }
`;

export const SignOutButton = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 0;
  border-radius: 999px;
  padding: 12px 16px;
  color: #fff;
  background: #c9000b;
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 180ms ease, transform 180ms ease;

  svg {
    width: 15px;
    height: 15px;
  }

  &:hover:not(:disabled) {
    background: #e0000d;
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid var(--lime);
    outline-offset: 3px;
  }

  &:disabled {
    cursor: progress;
    opacity: 0.6;
  }
`;
