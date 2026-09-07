import styled, { keyframes, css } from 'styled-components';

export const SectionWrapper = styled.section`
  width: 100%;
  padding: 6rem 1.5rem 7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.background};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 4rem 1rem 5rem;
  }
`;

export const ContentContainer = styled.div`
  max-width: 900px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  position: relative;
  z-index: 2;
`;

export const HeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
`;

export const BadgePill = styled.span`
  display: inline-block;
  padding: 0.4rem 1.1rem;
  border-radius: 9999px;
  background: ${({ theme }) => theme.accentBadgeBg};
  border: 1px solid ${({ theme }) => theme.accentBadgeBorder};
  color: ${({ theme }) => theme.accentText};
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

export const HeadingText = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.25rem, 4vw, 3.25rem);
  font-weight: 500;
  letter-spacing: -0.01em;
  word-spacing: 0.08em;
  color: ${({ theme }) => theme.foreground};
  margin: 0;
`;

export const AccordionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const AccordionItem = styled.div<{ $isOpen: boolean }>`
  position: relative;
  z-index: 2;
  width: 100%;
  border-radius: ${({ theme }) => theme.radius.card};
  background: ${({ theme }) => theme.surface};
  opacity: 1;
  border: 1px solid ${({ theme, $isOpen }) => ($isOpen ? theme.accentText : theme.border)};
  box-shadow: ${({ theme }) => (theme.isDark ? '0 10px 30px rgba(0, 0, 0, 0.25)' : '0 10px 30px rgba(0, 0, 0, 0.08)')};
  overflow: hidden;
  transition:
    border-color ${({ theme }) => theme.motion.interaction} ease,
    box-shadow ${({ theme }) => theme.motion.interaction} ease,
    transform ${({ theme }) => theme.motion.interaction} ease;

  &:hover {
    border-color: ${({ theme }) => theme.accentText};
    box-shadow: ${({ theme }) => (theme.isDark ? '0 16px 40px rgba(0, 0, 0, 0.35)' : '0 16px 40px rgba(0, 0, 0, 0.12)')};
  }
`;

export const AccordionHeader = styled.button<{ $isOpen: boolean }>`
  font-family: ${({ theme }) => theme.fonts.body};
  width: 100%;
  padding: 1.5rem 1.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  background: transparent;
  border: none;
  color: ${({ theme, $isOpen }) => ($isOpen ? theme.accentText : theme.foreground)};
  font-size: clamp(1.0625rem, 1.8vw, 1.25rem);
  font-weight: 700;
  text-align: left;
  cursor: pointer;
  outline: none;

  &:focus-visible {
    box-shadow: inset 0 0 0 2px ${({ theme }) => theme.primary};
    border-radius: ${({ theme }) => theme.radius.card};
  }

  @media (max-width: 768px) {
    padding: 1.25rem 1.25rem;
  }
`;

export const ChevronIcon = styled.span<{ $isOpen: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ theme, $isOpen }) =>
    $isOpen ? theme.accentBadgeBg : 'rgba(128, 128, 128, 0.1)'};
  color: ${({ theme, $isOpen }) => ($isOpen ? theme.accentText : theme.textSecondary)};
  transform: rotate(${({ $isOpen }) => ($isOpen ? '180deg' : '0deg')});
  transition: transform 0.25s ease;
  flex-shrink: 0;

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const AccordionPanel = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
`;

export const PanelContent = styled.div`
  overflow: hidden;
`;

export const AnswerText = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  padding: 0 1.75rem 1.5rem;
  margin: 0;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.9375rem; /* 15px base size */
  line-height: 1.65;

  @media (max-width: 768px) {
    padding: 0 1.25rem 1.25rem;
    font-size: 0.9375rem;
  }
`;
