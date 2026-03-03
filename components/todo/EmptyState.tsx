'use client';

import styled from '@emotion/styled';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl} 0;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Icon = styled.div`
  font-size: 40px;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  opacity: 0.4;
`;

const Text = styled.p`
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

export default function EmptyState() {
  return (
    <Wrapper>
      <Icon>
        <svg width={48} height={48} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <rect x="8" y="8" width="32" height="32" rx="4" />
          <path d="M16 24h16" />
          <path d="M24 16v16" />
        </svg>
      </Icon>
      <Text>오늘 할 일을 추가해보세요</Text>
    </Wrapper>
  );
}
