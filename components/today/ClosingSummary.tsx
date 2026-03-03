'use client';

import styled from '@emotion/styled';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.foreground};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Text = styled.p`
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text.secondary};
  word-break: keep-all;
`;

interface ClosingSummaryProps {
  text: string;
}

export default function ClosingSummary({ text }: ClosingSummaryProps) {
  return (
    <Card>
      <Text>{text}</Text>
    </Card>
  );
}
