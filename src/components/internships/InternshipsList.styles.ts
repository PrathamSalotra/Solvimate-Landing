import Link from 'next/link';
import styled, { keyframes, css } from 'styled-components';

export const SectionWrapper = styled.section`
  width: 100%;
  padding: 2rem 1.5rem 6.5rem;
  background: ${({ theme }) => theme.background};

  @media (max-width: 768px) {
    padding: 1.5rem 1rem 5rem;
  }
`;

export const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const InternshipCard = styled.article`
  background: ${({ theme }) => theme.cardBg};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 2.25rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.primaryHover};
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.06);
  }

  @media (max-width: 640px) {
    padding: 1.75rem 1.25rem;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const OpenBadge = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.8125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primaryHover};
  background: rgba(55, 251, 137, 0.12);
  border: 1px solid rgba(55, 251, 137, 0.3);
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.primaryHover};
    display: inline-block;
    box-shadow: 0 0 6px ${({ theme }) => theme.primaryHover};
  }
`;

export const TitleText = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.5rem;
  font-weight: 500;
  word-spacing: 0.06em;
  color: ${({ theme }) => theme.foreground};
  margin: 0;
  line-height: 1.3;
`;

export const DescText = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.65;
  margin: 0;
`;

export const DetailsBox = styled.div<{ $expanded: boolean }>`
  font-family: ${({ theme }) => theme.fonts.body};
  display: ${({ $expanded }) => ($expanded ? 'flex' : 'none')};
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.25rem;
  border-radius: 12px;
  background: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.border};
  font-size: 0.95rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.6;
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  padding-top: 0.5rem;
  border-top: 1px solid ${({ theme }) => theme.border};
`;

export const ActionsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

export const ViewDetailsButton = styled.button`
  font-family: ${({ theme }) => theme.fonts.body};
  padding: 0.7rem 1.4rem;
  border-radius: 9999px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.foreground};
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.primaryText};
  }
`;

export const ApplyButton = styled(Link)`
  font-family: ${({ theme }) => theme.fonts.body};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.75rem;
  border-radius: 9999px;
  background: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.colors.ink};
  font-size: 0.95rem;
  font-weight: 700;
  text-decoration: none;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease,
    box-shadow 0.2s ease;
  box-shadow: 0 4px 14px rgba(190, 254, 114, 0.25);

  &:hover {
    transform: translateY(-2px);
    background: ${({ theme }) => theme.primaryHover};
    box-shadow: 0 6px 20px rgba(190, 254, 114, 0.4);
  }
`;

export const EmptyStateCard = styled.div`
  background: ${({ theme }) => theme.cardBg};
  border: 1px dashed ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 4.5rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

export const EmptyMessageText = styled.h3`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(1.35rem, 2.5vw, 1.75rem);
  font-weight: 500;
  word-spacing: 0.06em;
  color: ${({ theme }) => theme.foreground};
  margin: 0;
  max-width: 600px;
  line-height: 1.4;
`;

export const EmptySubtext = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
`;

