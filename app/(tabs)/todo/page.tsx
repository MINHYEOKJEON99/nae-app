'use client';

import { useMemo } from 'react';
import Header from '@/components/layout/Header';
import TodoInput from '@/components/todo/TodoInput';
import TodoList from '@/components/todo/TodoList';
import EmptyState from '@/components/todo/EmptyState';
import { useTodos } from '@/hooks/useTodos';
import { getUserId } from '@/lib/userId';

/** YYYY-MM-DD → "3월 4일 화요일" 형식으로 변환 */
function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdays[d.getDay()];
  return `${month}월 ${day}일 ${weekday}요일`;
}

/**
 * Todo 탭 메인 페이지
 * - localStorage UUID 기반 사용자 식별 (로그인 없음)
 * - React Query로 서버 상태 관리 (추가/토글/삭제 뮤테이션)
 * - 로딩 / 빈 상태 / 목록 3가지 UI 분기
 */
export default function TodoPage() {
  // 오늘 날짜 (YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0];

  // 익명 사용자 ID — localStorage에 저장, 최초 방문 시 UUID 생성
  const userId = useMemo(() => getUserId(), []);

  // DB에서 오늘의 Todo 목록 조회 + CRUD 뮤테이션
  const { data: todos, isLoading, addTodo, toggleTodo, removeTodo } = useTodos(today, userId);

  /** 새 Todo 추가 — TodoInput에서 제목+시간 전달받음 */
  const handleAdd = (title: string, time: string) => {
    addTodo.mutate({
      userId,
      title,
      description: '',
      time,
      completed: false,
      date: today,
    });
  };

  /** 완료/미완료 토글 — PATCH /api/todos/:id */
  const handleToggle = (id: string) => {
    toggleTodo.mutate(id);
  };

  /** Todo 삭제 — DELETE /api/todos/:id */
  const handleDelete = (id: string) => {
    removeTodo.mutate(id);
  };

  return (
    <div>
      <Header date={formatDate(today)} title="Todo" />
      <TodoInput onAdd={handleAdd} />

      {/* 로딩 → 빈 상태 → 목록 순서로 분기 */}
      {isLoading ? (
        <p style={{ color: '#8b95a1', fontSize: '14px' }}>로딩 중...</p>
      ) : !todos || todos.length === 0 ? (
        <EmptyState />
      ) : (
        <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
      )}
    </div>
  );
}
