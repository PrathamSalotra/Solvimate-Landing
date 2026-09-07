import styled, { keyframes, css } from 'styled-components';

export const MainWrapper = styled.main`
  width: 100%;
  overflow-x: hidden;
  position: relative;
  z-index: 1;
`;

export const FixedBackgroundGlobe = styled.div`
  position: fixed;
  top: 15vh;
  left: 50%;
  transform: translateX(-50%);
  width: 680px;
  height: 680px;
  opacity: 0.3;
  pointer-events: none;
  z-index: 0;

  @media (max-width: 768px) {
    width: 420px;
    height: 420px;
    top: 20vh;
  }
`;
