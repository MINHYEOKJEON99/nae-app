import { getDb } from '@/lib/mongodb';
import { getKSTDateString, getKSTYesterdayString } from '@/lib/format';
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
export async function getArticles(
  limit = 20,
  date?: string,
): Promise<{ articles: Article[]; hasMore: boolean }> {
  const db = await getDb();
  const col = db.collection('articles');
  const targetDate = date || getKSTDateString();

  let docs = await col
    .find({ crawlBatch: { $regex: `^${targetDate}` } })
    .sort({ trendScore: -1, createdAt: -1 })
    .limit(limit)
    .toArray();

  // 특정 날짜 지정이 없고 오늘 데이터가 없으면 전날 데이터로 fallback
  if (!date && docs.length === 0) {
    const yesterdayKST = getKSTYesterdayString();
    docs = await col
      .find({ crawlBatch: { $regex: `^${yesterdayKST}` } })
      .sort({ trendScore: -1, createdAt: -1 })
      .limit(limit)
      .toArray();
  }

  const total = await col.countDocuments({ crawlBatch: { $regex: `^${targetDate}` } });
  const articles = docs.map(({ _id, ...rest }) => ({
    ...rest,
    _id: _id.toString(),
  })) as Article[];

  return { articles, hasMore: limit < total };
}
