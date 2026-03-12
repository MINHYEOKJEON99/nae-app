import { useQuery } from '@tanstack/react-query';
import { fetchArticle } from '@/lib/api';

export function useArticle(id: string) {
  return useQuery({
    queryKey: ['article', id],
    queryFn: () => fetchArticle(id),
    enabled: !!id,
  });
}
