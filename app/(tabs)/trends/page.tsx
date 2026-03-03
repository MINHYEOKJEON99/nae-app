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

export default function TrendsPage() {
  return (
    <div>
      <Title>Trends</Title>
      <Description>IT 트렌드 뉴스가 여기에 표시됩니다.</Description>
    </div>
  );
}
