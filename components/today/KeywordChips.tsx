'use client';

import styled from '@emotion/styled';
import { hideScrollbar } from '@/styles/mixins';

const Wrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
  padding: ${({ theme }) => theme.spacing.xs} 0;
`;

const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  background: ${({ theme }) => theme.colors.foreground};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: 500;
  white-space: nowrap;
`;

interface KeywordChipsProps {
  keywords: string[];
}

export default function KeywordChips({ keywords }: KeywordChipsProps) {
  return (
    <Wrapper>
      {keywords.map((keyword) => (
        <Chip key={keyword}>{keyword}</Chip>
      ))}
    </Wrapper>
  );
}
