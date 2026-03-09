/**
 * GET /api/articles?page=0&pageSize=10&category=global|korea
 *
 * 뉴스 기사 목록을 페이지네이션으로 조회
 * - trendScore 내림차순 → createdAt 내림차순 정렬
 * - category 필터 선택 적용 (없으면 전체)
 * - hasMore 플래그로 무한 스크롤 지원
 */
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { getKSTDateString, getKSTYesterdayString } from '@/lib/format';

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  // 페이지네이션 파라미터 — 음수/과대값 방어
  const page = Math.max(0, Number(params.get('page') ?? 0));
  const pageSize = Math.min(50, Math.max(1, Number(params.get('pageSize') ?? 10)));
  const category = params.get('category'); // 'global' | 'korea' | null

  const db = await getDb();
  const col = db.collection('articles');

  // 오늘 날짜(KST) 기준 필터, 없으면 전날 fallback
  const todayKST = getKSTDateString();
  const filter: Record<string, unknown> = {
    crawlBatch: { $regex: `^${todayKST}` },
  };
  if (category && (category === 'global' || category === 'korea')) {
    filter.category = category;
  }

  const skip = page * pageSize;
  let total = await col.countDocuments(filter);
  if (total === 0) {
    filter.crawlBatch = { $regex: `^${getKSTYesterdayString()}` };
    total = await col.countDocuments(filter);
  }

  // 트렌드 점수 높은 순 → 최신순 정렬
  const docs = await col
    .find(filter)
    .sort({ trendScore: -1, createdAt: -1 })
    .skip(skip)
    .limit(pageSize)
    .toArray();

  // ObjectId → string 변환
  const items = docs.map(({ _id, ...rest }) => ({ ...rest, _id: _id.toString() }));
  return NextResponse.json({ items, hasMore: skip + pageSize < total });
}
