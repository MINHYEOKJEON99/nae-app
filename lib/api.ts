import type { DailyBriefing } from '@/types/briefing';
import type { Article } from '@/types/article';
import type { Todo } from '@/types/todo';
import { mockBriefing } from '@/mocks/briefings';
import { mockArticles } from '@/mocks/articles';
import {
  getMockTodos,
  addMockTodo,
  toggleMockTodo,
  deleteMockTodo,
} from '@/mocks/todos';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function fetchTodayBriefing(
  date: string
): Promise<DailyBriefing> {
  await delay(300);
  return mockBriefing;
}

export async function fetchArticles(
  page: number,
  pageSize = 10
): Promise<{ items: Article[]; hasMore: boolean }> {
  await delay(400);
  const start = page * pageSize;
  const items = mockArticles.slice(start, start + pageSize);
  return { items, hasMore: start + pageSize < mockArticles.length };
}

export async function fetchTodos(date: string): Promise<Todo[]> {
  await delay(200);
  return getMockTodos(date);
}

export async function createTodo(
  todo: Omit<Todo, '_id' | 'createdAt'>
): Promise<Todo> {
  await delay(200);
  return addMockTodo(todo);
}

export async function toggleTodoApi(id: string): Promise<Todo | null> {
  await delay(100);
  return toggleMockTodo(id);
}

export async function deleteTodoApi(id: string): Promise<void> {
  await delay(100);
  deleteMockTodo(id);
}
