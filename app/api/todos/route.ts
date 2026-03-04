/**
 * Todo API — 목록 조회 + 생성
 *
 * GET  /api/todos?date=YYYY-MM-DD&userId=xxx  → 해당 날짜의 Todo 목록
 * POST /api/todos (body: Todo 필드)            → 새 Todo 생성
 */
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

/**
 * GET — 특정 사용자의 특정 날짜 Todo 목록 조회
 * 시간순 → 생성순 정렬
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const date = params.get('date');
  const userId = params.get('userId');

  if (!date || !userId) {
    return NextResponse.json({ error: 'date and userId are required' }, { status: 400 });
  }

  const db = await getDb();
  const docs = await db
    .collection('todos')
    .find({ date, userId })
    .sort({ time: 1, createdAt: 1 })
    .toArray();

  // ObjectId → string 변환
  const items = docs.map(({ _id, ...rest }) => ({ ...rest, _id: _id.toString() }));
  return NextResponse.json(items);
}

/**
 * POST — 새 Todo 생성
 * 필수: userId, title, date / 선택: description, time, completed
 */
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { userId, title, description, time, completed, date } = body;

  // 필수 필드 검증
  if (!userId || !title || date === undefined) {
    return NextResponse.json({ error: 'userId, title, date are required' }, { status: 400 });
  }

  const doc = {
    userId,
    title,
    description: description ?? '',
    time: time ?? '',
    completed: completed ?? false,
    date,
    createdAt: new Date().toISOString(),
  };

  const db = await getDb();
  const result = await db.collection('todos').insertOne(doc);

  // 삽입된 문서를 _id 문자열과 함께 반환
  return NextResponse.json({ ...doc, _id: result.insertedId.toString() }, { status: 201 });
}
