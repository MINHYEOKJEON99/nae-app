import { getKSTDateString } from '@/lib/format';
import type { DailyBriefing } from '@/types/briefing';
import type { Article } from '@/types/article';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3000';

/**
 * 오늘의 브리핑을 API에서 조회
 * Server Component에서 사용
 */
export async function getBriefing(date: string, topic: string = 'IT'): Promise<DailyBriefing | null> {
  const res = await fetch(`${BASE_URL}/api/briefing?date=${date}&topic=${topic}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  return res.json();
}

/**
 * 기사 조회 (trendScore 내림차순)
 * Trends 페이지 Server Component에서 사용
 */
export async function getArticles(
  limit = 20,
  date?: string,
  topic?: string,
): Promise<{ articles: Article[]; hasMore: boolean }> {
  const targetDate = date || getKSTDateString();
  let url = `${BASE_URL}/api/articles?pageSize=${limit}&date=${targetDate}`;
  if (topic) url += `&topic=${topic}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) return { articles: [], hasMore: false };
  const data = await res.json();
  return { articles: data.items, hasMore: data.hasMore };
}

/**
 * 단일 기사 상세 조회 — 없으면 null 반환
 * Server Component에서 사용
 */
export async function getArticle(id: string): Promise<Article | null> {
  const res = await fetch(`${BASE_URL}/api/articles/${id}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  return res.json();
}
