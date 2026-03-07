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
 * 첫 페이지 기사 목록을 MongoDB에서 직접 조회
 * Trends 페이지 Server Component에서 initialData로 사용
 */
export async function getInitialArticles(
  pageSize = 10,
): Promise<{ items: Article[]; hasMore: boolean }> {
  const db = await getDb();
  const col = db.collection('articles');
  const total = await col.countDocuments({});
  const docs = await col
    .find({})
    .sort({ trendScore: -1, createdAt: -1 })
    .limit(pageSize)
    .toArray();

  const items = docs.map(({ _id, ...rest }) => ({
    ...rest,
    _id: _id.toString(),
  })) as Article[];

  return { items, hasMore: pageSize < total };
}
