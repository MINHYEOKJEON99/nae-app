'use client';

import styled from '@emotion/styled';
import type { Article } from '@/types/article';
import HotBadge from './HotBadge';

const RankedCard = styled.a`
  display: block;
  background: ${({ theme }) => theme.colors.foreground};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-decoration: none;
`;

const RankedTopRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Rank = styled.span`
  flex-shrink: 0;
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
  min-width: 24px;
`;

const RankedTitle = styled.h3`
  font-size: 15px;
  font-weight: 600;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.text.primary};
  word-break: keep-all;
  flex: 1;
`;

const RankedSummary = styled.p`
  font-size: 13px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  word-break: keep-all;
`;

const ChipRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
`;

const KeywordChip = styled.span`
  font-size: 11px;
  padding: 3px 8px;
  background: ${({ theme }) => theme.colors.button};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const CompactCard = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.foreground};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  text-decoration: none;
`;

const CompactContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const CompactTitle = styled.h4`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.4;
  margin-bottom: 4px;
  word-break: keep-all;
`;

const CompactMeta = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

interface ArticleCardProps {
  article: Article;
  variant: 'ranked' | 'compact';
  rank?: number;
}

export default function ArticleCard({
  article,
  variant,
  rank,
}: ArticleCardProps) {
  if (variant === 'ranked') {
    return (
      <RankedCard href={article.url} target="_blank" rel="noopener noreferrer">
        <RankedTopRow>
          <Rank>{rank}</Rank>
          <RankedTitle>{article.title}</RankedTitle>
        </RankedTopRow>
        <RankedSummary>{article.aiSummaryShort}</RankedSummary>
        <ChipRow>
          {article.isHot && <HotBadge />}
          {article.keywords.slice(0, 3).map((kw) => (
            <KeywordChip key={kw}>{kw}</KeywordChip>
          ))}
        </ChipRow>
      </RankedCard>
    );
  }

  return (
    <CompactCard href={article.url} target="_blank" rel="noopener noreferrer">
      <CompactContent>
        <CompactTitle>{article.title}</CompactTitle>
        <CompactMeta>
          {article.aiSummaryShort}
        </CompactMeta>
      </CompactContent>
      {article.isHot && <HotBadge />}
    </CompactCard>
  );
}
