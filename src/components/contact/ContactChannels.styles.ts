import styled, { keyframes, css } from 'styled-components';

export const ChannelsWrapper = styled.section`
  width: 100%;
  padding: 2.5rem 1.5rem 4rem;
  background: ${({ theme }) => theme.background};
  position: relative;
  z-index: 2;
`;

export const ChannelsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ChannelCard = styled.div`
  position: relative;
  z-index: 2;
  background: ${({ theme }) => theme.surface};
  opacity: 1;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: ${({ theme }) => (theme.isDark ? '0 10px 30px rgba(0, 0, 0, 0.25)' : '0 10px 30px rgba(0, 0, 0, 0.08)')};
  padding: 2.25rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.primaryHover};
    box-shadow: ${({ theme }) => (theme.isDark ? '0 18px 45px rgba(0, 0, 0, 0.4)' : '0 18px 45px rgba(0, 0, 0, 0.12)')};
  }
`;

export const IconCircle = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 12px;
  background: rgba(190, 254, 114, 0.12);
  color: ${({ theme }) => theme.primaryText};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 22px;
    height: 22px;
  }
`;

export const ChannelTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.95rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
`;

export const ChannelValue = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.foreground};
  line-height: 1.5;
  white-space: pre-line;

  a {
    color: ${({ theme }) => theme.primaryText};
    text-decoration: none;
    transition: color 0.15s ease;

    &:hover {
      text-decoration: underline;
    }
  }
`;
