import styled, { keyframes, css } from 'styled-components';

export const GlobeWrapper = styled.div`
  width: 100%;
  max-width: 540px;
  aspect-ratio: 1 / 1;
  position: relative;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;

  @media (max-width: 768px) {
    max-width: 360px;
  }
`;

export const StyledCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  contain: layout paint size;
  opacity: 0;
  transition: opacity 0.8s ease;
`;
