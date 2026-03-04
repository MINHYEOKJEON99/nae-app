/**
 * GET /api/briefing?date=YYYY-MM-DD
 *
 * 해당 날짜의 AI 데일리 브리핑을 조회
 * - daily_briefings 컬렉션에서 date 필드로 검색
 * - ObjectId → string 변환 후 반환
 */
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const date = request.nextUrl.searchParams.get('date');
    if (!date) {
      return NextResponse.json({ error: 'date is required' }, { status: 400 });
    }

    const db = await getDb();
    const briefing = await db.collection('daily_briefings').findOne({ date });

    if (!briefing) {
      return NextResponse.json({ error: 'not found' }, { status: 404 });
    }

    // MongoDB ObjectId를 문자열로 변환하여 클라이언트에 전달
    const { _id, ...rest } = briefing;
    return NextResponse.json({ ...rest, _id: _id.toString() });
  } catch (err) {
    console.error('[API /briefing] Error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
