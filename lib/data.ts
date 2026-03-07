import { getDb } from '@/lib/mongodb';
import type { DailyBriefing } from '@/types/briefing';
import type { Article } from '@/types/article';

/**
 * 오늘의 브리핑을 MongoDB에서 직접 조회
 * Server Component에서 사용
 */
export async function getBriefing(date: string): Promise<DailyBriefing | null> {
  const db = await getDb();
  const doc = await db.collection('daily_briefings').findOne({ date });
  if (!doc) return null;
  const { _id, ...rest } = doc;
  return { ...rest, _id: _id.toString() } as DailyBriefing;
}

/**
 * 카테고리별 기사 조회 (trendScore 내림차순)
 * Trends 페이지 Server Component에서 사용
 */
export async function getArticlesByCategory(
  category: 'global' | 'korea',
  limit = 30,
): Promise<Article[]> {
  const db = await getDb();
  const docs = await db
    .collection('articles')
    .find({ category })
    .sort({ trendScore: -1, createdAt: -1 })
    .limit(limit)
    .toArray();

  return docs.map(({ _id, ...rest }) => ({
    ...rest,
    _id: _id.toString(),
  })) as Article[];
}
