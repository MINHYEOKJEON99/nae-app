/**
 * API 클라이언트 레이어
 *
 * 프론트엔드 hooks에서 호출하는 데이터 페칭 함수 모음
 * Phase 8에서 mock → fetch('/api/...') 호출로 교체됨
 * 함수 시그니처는 기존과 동일하게 유지하여 hooks 호환성 보장
 */
import type { DailyBriefing } from '@/types/briefing';
import type { Article } from '@/types/article';
import type { Todo } from '@/types/todo';

/** 특정 날짜의 AI 데일리 브리핑 조회 */
export async function fetchTodayBriefing(
  date: string
): Promise<DailyBriefing> {
  const res = await fetch(`/api/briefing?date=${date}`);
  if (!res.ok) throw new Error('briefing fetch failed');
  return res.json();
}

/** 기사 목록 페이지네이션 조회 — 무한 스크롤용 */
export async function fetchArticles(
  page: number,
  pageSize = 10
): Promise<{ items: Article[]; hasMore: boolean }> {
  const res = await fetch(`/api/articles?page=${page}&pageSize=${pageSize}`);
  if (!res.ok) throw new Error('articles fetch failed');
  return res.json();
}

/** 특정 사용자의 특정 날짜 Todo 목록 조회 */
export async function fetchTodos(date: string, userId: string): Promise<Todo[]> {
  const res = await fetch(`/api/todos?date=${date}&userId=${userId}`);
  if (!res.ok) throw new Error('todos fetch failed');
  return res.json();
}

/** 새 Todo 생성 — _id와 createdAt은 서버에서 자동 부여 */
export async function createTodo(
  todo: Omit<Todo, '_id' | 'createdAt'>
): Promise<Todo> {
  const res = await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  if (!res.ok) throw new Error('create todo failed');
  return res.json();
}

/** Todo 완료/미완료 토글 — PATCH /api/todos/:id */
export async function toggleTodoApi(id: string): Promise<Todo> {
  const res = await fetch(`/api/todos/${id}`, { method: 'PATCH' });
  if (!res.ok) throw new Error('toggle todo failed');
  return res.json();
}

/** Todo 삭제 — DELETE /api/todos/:id */
export async function deleteTodoApi(id: string): Promise<void> {
  const res = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('delete todo failed');
}
