"use client";

import { useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { Article } from "@/types/article";
import { fetchArticles } from "@/lib/api";
import { colors } from "@/lib/theme";
import { SkeletonCard } from "@/components/common/Skeleton";
import ArticleCard from "./ArticleCard";

interface TrendsFeedProps {
  date: string;
}

export default function TrendsFeed({ date }: TrendsFeedProps) {
  const observerRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["articles", date],
    queryFn: ({ pageParam }) => fetchArticles(pageParam, date),
    initialPageParam: 0,
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

  if (isLoading) {
    return (
      <>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </>
    );
  }

  const articles = data?.pages.flatMap((p) => p.items) ?? [];

  if (articles.length === 0) {
    return <p style={{ color: colors.textSecondary, fontSize: 14 }}>뉴스가 아직 없어요.</p>;
  }

  const hasSummary = (a: Article) => a.aiSummaryShort && a.aiSummaryShort !== a.title;
  const withSummary = articles.filter(hasSummary);
  const noSummary = articles.filter((a) => !hasSummary(a));
  const best5 = withSummary.slice(0, 5);
  const rest = [...withSummary.slice(5), ...noSummary];

  return (
    <>
      <section style={{ marginBottom: "32px" }}>
        {best5.map((article, i) => (
          <ArticleCard key={article._id} article={article} variant="ranked" rank={i + 1} />
        ))}
      </section>

      {rest.length > 0 && (
        <section>
          <h2
            style={{
              fontSize: "16px",
              lineHeight: "24px",
              fontWeight: 600,
              color: colors.textPrimary,
              marginBottom: "16px",
            }}>
            Top 뉴스
          </h2>
          {rest.map((article) => (
            <ArticleCard key={article._id} article={article} variant="compact" />
          ))}
        </section>
      )}

      {hasNextPage && (
        <div ref={observerRef} style={{ display: "flex", justifyContent: "center", padding: "24px 0" }}>
          {isFetchingNextPage && <span style={{ color: colors.textTertiary, fontSize: "14px" }}>불러오는 중...</span>}
        </div>
      )}
    </>
  );
}
