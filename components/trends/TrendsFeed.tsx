"use client";

import { useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { Article } from "@/types/article";
import ArticleCard from "./ArticleCard";

interface TrendsFeedProps {
  initialArticles: Article[];
  date: string;
  hasMore: boolean;
}

async function fetchArticles({ pageParam, date }: { pageParam: number; date: string }) {
  const res = await fetch(`/api/articles?page=${pageParam}&pageSize=20&date=${date}`);
  return res.json() as Promise<{ items: Article[]; hasMore: boolean }>;
}

export default function TrendsFeed({ initialArticles, date, hasMore: initialHasMore }: TrendsFeedProps) {
  const observerRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["articles", date],
    queryFn: ({ pageParam }) => fetchArticles({ pageParam, date }),
    initialPageParam: 1,
    initialData: {
      pages: [{ items: initialArticles, hasMore: initialHasMore }],
      pageParams: [1],
    },
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.hasMore ? (lastPageParam as number) + 1 : undefined,
  });

  useEffect(() => {
    const el = observerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const articles = data?.pages.flatMap((p) => p.items) ?? [];
  const hasSummary = (a: Article) => a.aiSummaryShort && a.aiSummaryShort !== a.title;
  const withSummary = articles.filter(hasSummary);
  const noSummary = articles.filter((a) => !hasSummary(a));
  const best5 = withSummary.slice(0, 5);
  const rest = [...withSummary.slice(5), ...noSummary];

  return (
    <>
      <section className="mb-xl">
        <h2 className="text-subheading font-semibold text-text-primary mb-md">BEST 5</h2>
        {best5.map((article, i) => (
          <ArticleCard key={article._id} article={article} variant="ranked" rank={i + 1} />
        ))}
      </section>

      {rest.length > 0 && (
        <section>
          <h2 className="text-subheading font-semibold text-text-primary mb-md">Top 뉴스</h2>
          {rest.map((article) => (
            <ArticleCard key={article._id} article={article} variant="compact" />
          ))}
        </section>
      )}

      {hasNextPage && (
        <div ref={observerRef} className="flex justify-center py-lg">
          {isFetchingNextPage && <span className="text-text-tertiary text-sm">불러오는 중...</span>}
        </div>
      )}
    </>
  );
}
