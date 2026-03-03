import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchArticles } from '@/lib/api';

export function useArticles() {
  return useInfiniteQuery({
    queryKey: ['articles'],
    queryFn: ({ pageParam = 0 }) => fetchArticles(pageParam),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasMore ? allPages.length : undefined,
    initialPageParam: 0,
  });
}
