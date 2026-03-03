'use client';

import styled from '@emotion/styled';
import type { Article } from '@/types/article';
import ArticleCard from './ArticleCard';
import InfiniteScrollTrigger from '@/components/common/InfiniteScrollTrigger';
import { SkeletonCard } from '@/components/common/Skeleton';

const Section = styled.section``;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.subheading.fontSize};
  font-weight: ${({ theme }) => theme.typography.subheading.fontWeight};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

interface ArticleListProps {
  articles: Article[];
  hasMore: boolean;
  isFetchingMore: boolean;
  onLoadMore: () => void;
}

export default function ArticleList({
  articles,
  hasMore,
  isFetchingMore,
  onLoadMore,
}: ArticleListProps) {
  return (
    <Section>
      <SectionTitle>더 많은 뉴스</SectionTitle>
      {articles.map((article) => (
        <ArticleCard
          key={article._id}
          article={article}
          variant="compact"
        />
      ))}
      {isFetchingMore && (
        <>
          <SkeletonCard />
          <SkeletonCard />
        </>
      )}
      <InfiniteScrollTrigger onTrigger={onLoadMore} enabled={hasMore && !isFetchingMore} />
    </Section>
  );
}
