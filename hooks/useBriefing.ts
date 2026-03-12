import { useQuery } from '@tanstack/react-query';
import { fetchBriefing } from '@/lib/api';

export function useBriefing(date: string) {
  return useQuery({
    queryKey: ['briefing', date],
    queryFn: () => fetchBriefing(date),
    enabled: !!date,
  });
}
