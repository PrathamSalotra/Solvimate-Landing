import styled, { keyframes, css } from 'styled-components';

export const PageContainer = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  padding: 4rem 1.5rem;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.foreground};
  }

  p {
    color: ${({ theme }) => theme.textSecondary};
    font-size: 1.125rem;
    max-width: 700px;
    margin-bottom: 2rem;
  }
`;

export const SitemapList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  a {
    color: ${({ theme }) => theme.primary};
    font-size: 1.0625rem;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
