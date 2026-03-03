import { useQuery } from '@tanstack/react-query';
import { fetchTodayBriefing } from '@/lib/api';

export function useBriefing(date: string) {
  return useQuery({
    queryKey: ['briefing', date],
    queryFn: () => fetchTodayBriefing(date),
  });
}
