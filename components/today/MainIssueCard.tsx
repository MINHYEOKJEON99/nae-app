'use client';

import styled from '@emotion/styled';
import type { MainIssue } from '@/types/briefing';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.foreground};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const TopRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const NumberBadge = styled.div`
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.typography.subheading.fontSize};
  font-weight: ${({ theme }) => theme.typography.subheading.fontWeight};
  line-height: ${({ theme }) => theme.typography.subheading.lineHeight};
  color: ${({ theme }) => theme.colors.text.primary};
  word-break: keep-all;
`;

const Summary = styled.p`
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  word-break: keep-all;
`;

const WhyBox = styled.div`
  background: ${({ theme }) => theme.colors.button};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
`;

const WhyLabel = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const WhyText = styled.p`
  font-size: 13px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.secondary};
  word-break: keep-all;
`;

interface MainIssueCardProps {
  issue: MainIssue;
  index: number;
}

export default function MainIssueCard({ issue, index }: MainIssueCardProps) {
  return (
    <Card>
      <TopRow>
        <NumberBadge>{index + 1}</NumberBadge>
        <Title>{issue.title}</Title>
      </TopRow>
      <Summary>{issue.summary}</Summary>
      <WhyBox>
        <WhyLabel>왜 중요한가?</WhyLabel>
        <WhyText>{issue.whyImportant}</WhyText>
      </WhyBox>
    </Card>
  );
}
