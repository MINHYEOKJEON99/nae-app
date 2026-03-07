import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchArticles } from '@/lib/api';
import type { Article } from '@/types/article';

export function useArticles(
  initialArticles?: Article[],
  initialHasMore?: boolean,
) {
  return useInfiniteQuery({
    queryKey: ['articles'],
    queryFn: ({ pageParam = 0 }) => fetchArticles(pageParam),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasMore ? allPages.length : undefined,
    initialPageParam: 0,
    ...(initialArticles
      ? {
          initialData: {
            pages: [{ items: initialArticles, hasMore: initialHasMore ?? false }],
            pageParams: [0],
          },
        }
      : {}),
  });
}
