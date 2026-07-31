'use client';

import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useLanguage } from '@/context/LanguageContext';

const SectionWrapper = styled.section`
  width: 100%;
  padding: 6rem 1.5rem 7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.background};
  border-bottom: 1px solid ${({ theme }) => theme.border};

  @media (max-width: 768px) {
    padding: 4rem 1rem 5rem;
  }
`;

const ContentContainer = styled.div`
  max-width: 900px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

const HeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
`;

const BadgePill = styled.span`
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

const HeadingText = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2.25rem, 4vw, 3.25rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.foreground};
  margin: 0;
`;

const AccordionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AccordionItem = styled.div<{ $isOpen: boolean }>`
  width: 100%;
  border-radius: ${({ theme }) => theme.radius.card};
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme, $isOpen }) => ($isOpen ? theme.accentText : theme.border)};
  overflow: hidden;
`;

const AccordionHeader = styled.button<{ $isOpen: boolean }>`
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

const ChevronIcon = styled.span<{ $isOpen: boolean }>`
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

const AccordionPanel = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
`;

const PanelContent = styled.div`
  overflow: hidden;
`;

const AnswerText = styled.p`
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

export default function FAQSection() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const faqItems = [
    { questionKey: 'faq1Question', answerKey: 'faq1Answer' },
    { questionKey: 'faq2Question', answerKey: 'faq2Answer' },
    { questionKey: 'faq3Question', answerKey: 'faq3Answer' },
    { questionKey: 'faq4Question', answerKey: 'faq4Answer' },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const total = faqItems.length;

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        const nextIndex = (index + 1) % total;
        buttonRefs.current[nextIndex]?.focus();
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        const prevIndex = (index - 1 + total) % total;
        buttonRefs.current[prevIndex]?.focus();
        break;
      }
      case 'Home': {
        e.preventDefault();
        buttonRefs.current[0]?.focus();
        break;
      }
      case 'End': {
        e.preventDefault();
        buttonRefs.current[total - 1]?.focus();
        break;
      }
      case 'Enter':
      case ' ': {
        e.preventDefault();
        handleToggle(index);
        break;
      }
      default:
        break;
    }
  };

  return (
    <SectionWrapper aria-labelledby="faq-section-heading">
      <ContentContainer>
        <HeaderBlock data-gsap="heading">
          <BadgePill>{t('home.faqBadge')}</BadgePill>
          <HeadingText id="faq-section-heading">{t('home.faqHeading')}</HeadingText>
        </HeaderBlock>

        <AccordionContainer role="region" aria-label="Frequently Asked Questions">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const headerId = `faq-header-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <AccordionItem key={item.questionKey} $isOpen={isOpen}>
                <AccordionHeader
                  id={headerId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  $isOpen={isOpen}
                  onClick={() => handleToggle(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => {
                    buttonRefs.current[index] = el;
                  }}
                >
                  <span>{t(`home.${item.questionKey}`)}</span>
                  <ChevronIcon $isOpen={isOpen} aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </ChevronIcon>
                </AccordionHeader>
                <AccordionPanel $isOpen={isOpen}>
                  <PanelContent>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={headerId}
                      aria-hidden={!isOpen}
                    >
                      <AnswerText>{t(`home.${item.answerKey}`)}</AnswerText>
                    </div>
                  </PanelContent>
                </AccordionPanel>
              </AccordionItem>
            );
          })}
        </AccordionContainer>
      </ContentContainer>
    </SectionWrapper>
  );
}
