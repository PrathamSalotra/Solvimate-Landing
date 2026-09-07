import styled, { keyframes, css } from 'styled-components';

export const HomeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
`;

export const FixedWaveBackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
  opacity: 0.35;
  overflow: hidden;
`;

export const StatusSection = styled.section`
  max-width: 1200px;
  width: 100%;
  padding: 2rem 1.5rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.border};
  position: relative;
  z-index: 2;
`;

export const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.35rem 1rem;
  background: rgba(190, 254, 114, 0.1);
  border: 1px solid rgba(190, 254, 114, 0.3);
  color: ${({ theme }) => theme.primary};
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
`;

export const TestInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  max-width: 420px;
`;

export const TestInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.foreground};
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;
