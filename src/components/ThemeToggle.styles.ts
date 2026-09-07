import styled, { keyframes, css } from 'styled-components';

export const ToggleButton = styled.button`
  background: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.foreground};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 50%;
  width: 38px;
  height: 38px;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    transform 0.1s ease;
  padding: 0;

  &:hover {
    background: ${({ theme }) => theme.surface};
    border-color: ${({ theme }) => theme.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 2px;
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 18px;
    height: 18px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;
