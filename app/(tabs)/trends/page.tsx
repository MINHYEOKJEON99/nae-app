'use client';

import { useState, useMemo, useCallback } from 'react';
import Header from '@/components/layout/Header';
import CategoryFilter from '@/components/trends/CategoryFilter';
import TopFiveSection from '@/components/trends/TopFiveSection';
import ArticleList from '@/components/trends/ArticleList';
import { SkeletonCard } from '@/components/common/Skeleton';
import { useArticles } from '@/hooks/useArticles';

type FilterValue = 'all' | 'global' | 'korea';

export default function TrendsPage() {
  const [filter, setFilter] = useState<FilterValue>('all');
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useArticles();

  const allArticles = useMemo(
    () => data?.pages.flatMap((p) => p.items) ?? [],
    [data]
  );

  const filtered = useMemo(
    () =>
      filter === 'all'
        ? allArticles
        : allArticles.filter((a) => a.category === filter),
    [allArticles, filter]
  );

  const top5Ids = useMemo(() => {
    const top = [...filtered]
      .sort((a, b) => b.trendScore - a.trendScore)
      .slice(0, 5);
    return new Set(top.map((a) => a._id));
  }, [filtered]);

  const restArticles = useMemo(
    () => filtered.filter((a) => !top5Ids.has(a._id)),
    [filtered, top5Ids]
  );

  const handleLoadMore = useCallback(() => {
    if (hasNextPage) fetchNextPage();
  }, [hasNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div>
        <Header title="Trends" />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  return (
    <div>
      <Header title="Trends" />
      <CategoryFilter value={filter} onChange={setFilter} />
      <TopFiveSection articles={filtered} />
      <ArticleList
        articles={restArticles}
        hasMore={!!hasNextPage}
        isFetchingMore={isFetchingNextPage}
        onLoadMore={handleLoadMore}
      />
    </div>
  );
}
