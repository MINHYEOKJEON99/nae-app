'use client';

import { useState, useMemo, useCallback } from 'react';
import CategoryFilter from '@/components/trends/CategoryFilter';
import TopFiveSection from '@/components/trends/TopFiveSection';
import ArticleList from '@/components/trends/ArticleList';
import { SkeletonCard } from '@/components/common/Skeleton';
import { useArticles } from '@/hooks/useArticles';
import type { Article } from '@/types/article';

type FilterValue = 'all' | 'global' | 'korea';

interface TrendsContentProps {
  initialArticles: Article[];
  initialHasMore: boolean;
}

export default function TrendsContent({
  initialArticles,
  initialHasMore,
}: TrendsContentProps) {
  const [filter, setFilter] = useState<FilterValue>('all');

  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useArticles(initialArticles, initialHasMore);

  const allArticles = useMemo(
    () => data?.pages.flatMap((p) => p.items) ?? [],
    [data],
  );

  const filtered = useMemo(
    () =>
      filter === 'all'
        ? allArticles
        : allArticles.filter((a) => a.category === filter),
    [allArticles, filter],
  );

  const top5Ids = useMemo(() => {
    const top = [...filtered]
      .sort((a, b) => b.trendScore - a.trendScore)
      .slice(0, 5);
    return new Set(top.map((a) => a._id));
  }, [filtered]);

  const restArticles = useMemo(
    () => filtered.filter((a) => !top5Ids.has(a._id)),
    [filtered, top5Ids],
  );

  const handleLoadMore = useCallback(() => {
    if (hasNextPage) fetchNextPage();
  }, [hasNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </>
    );
  }

  return (
    <>
      <CategoryFilter value={filter} onChange={setFilter} />
      <TopFiveSection articles={filtered} />
      <ArticleList
        articles={restArticles}
        hasMore={!!hasNextPage}
        isFetchingMore={isFetchingNextPage}
        onLoadMore={handleLoadMore}
      />
    </>
  );
}
