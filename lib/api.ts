/**
 * API 클라이언트 레이어
 *
 * 프론트엔드 hooks에서 호출하는 데이터 페칭 함수 모음
 */
import type { Article } from '@/types/article';
import type { DailyBriefing } from '@/types/briefing';
import type { Todo } from '@/types/todo';
import { API_BASE } from './apiBase';

/** 기사 목록 페이지네이션 조회 */
export async function fetchArticles(page: number, date: string, pageSize = 20): Promise<{ items: Article[]; hasMore: boolean }> {
  const res = await fetch(`${API_BASE}/api/articles?page=${page}&pageSize=${pageSize}&date=${date}`);
  if (!res.ok) throw new Error('articles fetch failed');
  return res.json();
}

/** 단일 기사 상세 조회 — 없으면 null 반환 */
export async function fetchArticle(id: string): Promise<Article | null> {
  const res = await fetch(`${API_BASE}/api/articles/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('article fetch failed');
  return res.json();
}

/** 특정 날짜의 브리핑 조회 — 없으면 null 반환 */
export async function fetchBriefing(date: string): Promise<DailyBriefing | null> {
  const res = await fetch(`${API_BASE}/api/briefing?date=${date}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('briefing fetch failed');
  return res.json();
}

/** 특정 사용자의 특정 날짜 Todo 목록 조회 */
export async function fetchTodos(date: string, userId: string): Promise<Todo[]> {
  const res = await fetch(`${API_BASE}/api/todos?date=${date}&userId=${userId}`);
  if (!res.ok) throw new Error('todos fetch failed');
  return res.json();
}

/** 새 Todo 생성 — _id와 createdAt은 서버에서 자동 부여 */
export async function createTodo(
  todo: Omit<Todo, '_id' | 'createdAt'>
): Promise<Todo> {
  const res = await fetch(`${API_BASE}/api/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
  if (!res.ok) throw new Error('create todo failed');
  return res.json();
}

/** Todo 완료/미완료 토글 — PATCH /api/todos/:id */
export async function toggleTodoApi(id: string): Promise<Todo> {
  const res = await fetch(`${API_BASE}/api/todos/${id}`, { method: 'PATCH' });
  if (!res.ok) throw new Error('toggle todo failed');
  return res.json();
}

/** Todo 삭제 — DELETE /api/todos/:id */
export async function deleteTodoApi(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/todos/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('delete todo failed');
}
