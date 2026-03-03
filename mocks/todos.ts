import type { Todo } from '@/types/todo';

let todos: Todo[] = [
  {
    _id: 'todo-001',
    userId: 'guest',
    title: '아침 스탠드업 미팅',
    description: '팀 일일 미팅',
    time: '09:00',
    completed: true,
    date: '2026-03-04',
    createdAt: '2026-03-04T00:00:00Z',
  },
  {
    _id: 'todo-002',
    userId: 'guest',
    title: '이메일 확인 및 답장',
    description: '',
    time: '09:00',
    completed: false,
    date: '2026-03-04',
    createdAt: '2026-03-04T00:00:00Z',
  },
  {
    _id: 'todo-003',
    userId: 'guest',
    title: 'PR 리뷰 — 로그인 기능',
    description: 'feature/auth 브랜치 리뷰',
    time: '10:30',
    completed: false,
    date: '2026-03-04',
    createdAt: '2026-03-04T00:00:00Z',
  },
  {
    _id: 'todo-004',
    userId: 'guest',
    title: 'API 설계 문서 작성',
    description: '뉴스 크롤링 API 스펙',
    time: '14:00',
    completed: false,
    date: '2026-03-04',
    createdAt: '2026-03-04T00:00:00Z',
  },
  {
    _id: 'todo-005',
    userId: 'guest',
    title: '디자인 시스템 컴포넌트 정리',
    description: 'Button, Card, Input 컴포넌트',
    time: '14:00',
    completed: false,
    date: '2026-03-04',
    createdAt: '2026-03-04T00:00:00Z',
  },
  {
    _id: 'todo-006',
    userId: 'guest',
    title: '운동',
    description: '헬스장',
    time: '18:00',
    completed: false,
    date: '2026-03-04',
    createdAt: '2026-03-04T00:00:00Z',
  },
];

let nextId = 7;

export function getMockTodos(date: string): Todo[] {
  return todos.filter((t) => t.date === date);
}

export function addMockTodo(
  todo: Omit<Todo, '_id' | 'createdAt'>
): Todo {
  const newTodo: Todo = {
    ...todo,
    _id: `todo-${String(nextId++).padStart(3, '0')}`,
    createdAt: new Date().toISOString(),
  };
  todos = [...todos, newTodo];
  return newTodo;
}

export function toggleMockTodo(id: string): Todo | null {
  let toggled: Todo | null = null;
  todos = todos.map((t) => {
    if (t._id === id) {
      toggled = { ...t, completed: !t.completed };
      return toggled;
    }
    return t;
  });
  return toggled;
}

export function deleteMockTodo(id: string): void {
  todos = todos.filter((t) => t._id !== id);
}
