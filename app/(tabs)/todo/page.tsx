'use client';

import styled from '@emotion/styled';

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.heading.fontSize};
  font-weight: ${({ theme }) => theme.typography.heading.fontWeight};
  line-height: ${({ theme }) => theme.typography.heading.lineHeight};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
`;

export default function TodoPage() {
  return (
    <div>
      <Title>Todo</Title>
      <Description>오늘의 할 일이 여기에 표시됩니다.</Description>
    </div>
  );
}
