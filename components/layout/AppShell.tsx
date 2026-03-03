'use client';

import styled from '@emotion/styled';

const Wrapper = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  min-height: 100dvh;
  background: ${({ theme }) => theme.colors.background};
  position: relative;

  @media (min-width: 481px) {
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.06);
  }
`;

const Content = styled.main`
  padding: ${({ theme }) => theme.spacing.md};
  padding-bottom: calc(56px + env(safe-area-inset-bottom, 0px) + 16px);
`;

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  );
}
