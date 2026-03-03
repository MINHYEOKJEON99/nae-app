'use client';

import styled from '@emotion/styled';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.foreground};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Label = styled.span`
  display: inline-block;
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Text = styled.p`
  font-size: 15px;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text.primary};
  word-break: keep-all;
`;

interface BriefingCardProps {
  intro: string;
}

export default function BriefingCard({ intro }: BriefingCardProps) {
  return (
    <Card>
      <Label>오늘의 브리핑</Label>
      <Text>{intro}</Text>
    </Card>
  );
}
