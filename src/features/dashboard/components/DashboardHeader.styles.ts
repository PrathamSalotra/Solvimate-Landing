import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

export const TopLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--mist);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

export const HeadingGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 16px;
`;

export const TitleGroup = styled.div`
  max-width: 680px;
`;

export const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 8px;
  color: var(--mist);
  font-size: 0.75rem;
  font-family: var(--font-mono);
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  background: rgba(159, 184, 180, 0.1);
  padding: 4px 10px;
  border-radius: 20px;
`;

export const Title = styled.h1`
  margin: 0;
  color: var(--foreground);
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  font-weight: 600;
  letter-spacing: -0.5px;
`;

export const Subtitle = styled.p`
  margin: 4px 0 0;
  color: var(--mist);
  line-height: 1.5;
  font-size: 0.95rem;
`;

export const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const SignOutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  background: transparent;
  color: var(--mist);
  font-size: 0.8rem;
  font-weight: 500;
  padding: 6px 14px;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: var(--foreground);
    border-color: rgba(255, 255, 255, 0.3);
  }

  &:disabled {
    cursor: progress;
    opacity: 0.5;
  }
`;
