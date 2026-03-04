/**
 * Todo 개별 조작 API — 완료 토글 + 삭제
 *
 * PATCH  /api/todos/:id  → completed 상태 반전 (토글)
 * DELETE /api/todos/:id  → Todo 삭제
 *
 * Next.js 16에서는 params가 Promise이므로 await 필요
 */
import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/mongodb';

/** Next.js 16 async params 타입 */
type Params = Promise<{ id: string }>;

/**
 * PATCH — Todo 완료/미완료 토글
 * 현재 completed 값을 읽고 반전시켜 저장
 */
export async function PATCH(request: NextRequest, { params }: { params: Params }) {
  const { id } = await params;

  // ObjectId 형식 검증
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'invalid id' }, { status: 400 });
  }

  const db = await getDb();
  const col = db.collection('todos');
  const existing = await col.findOne({ _id: new ObjectId(id) });

  if (!existing) {
    return NextResponse.json({ error: 'not found' }, { status: 404 });
  }

  // completed 값 반전
  await col.updateOne(
    { _id: new ObjectId(id) },
    { $set: { completed: !existing.completed } }
  );

  // 업데이트된 Todo 반환 (ObjectId → string)
  const { _id, ...rest } = existing;
  return NextResponse.json({ ...rest, _id: _id.toString(), completed: !existing.completed });
}

/**
 * DELETE — Todo 삭제
 * deletedCount가 0이면 404 반환
 */
export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  const { id } = await params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'invalid id' }, { status: 400 });
  }

  const db = await getDb();
  const result = await db.collection('todos').deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 0) {
    return NextResponse.json({ error: 'not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
