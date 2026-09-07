'use client';

import React, { useState, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  SectionWrapper,
  ContentContainer,
  HeaderBlock,
  BadgePill,
  HeadingText,
  AccordionContainer,
  AccordionItem,
  AccordionHeader,
  ChevronIcon,
  AccordionPanel,
  PanelContent,
  AnswerText,
} from './FAQSection.styles';

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
