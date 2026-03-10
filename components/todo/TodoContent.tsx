'use client';

import { useMemo } from 'react';
import TodoInput from '@/components/todo/TodoInput';
import TodoList from '@/components/todo/TodoList';
import EmptyState from '@/components/todo/EmptyState';
import { useTodos } from '@/hooks/useTodos';
import { getUserId } from '@/lib/userId';

export default function TodoContent({ date }: { date: string }) {
  const userId = useMemo(() => getUserId(), []);
  const { data: todos, isLoading, addTodo, toggleTodo, removeTodo } = useTodos(date, userId);

  const handleAdd = (title: string, time: string) => {
    addTodo.mutate({
      userId,
      title,
      description: '',
      time,
      completed: false,
      date,
    });
  };

  const handleToggle = (id: string) => {
    toggleTodo.mutate(id);
  };

  const handleDelete = (id: string) => {
    removeTodo.mutate(id);
  };

  return (
    <>
      <TodoInput onAdd={handleAdd} />
      {isLoading ? (
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 14 }}>로딩 중...</p>
      ) : !todos || todos.length === 0 ? (
        <EmptyState />
      ) : (
        <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
      )}
    </>
  );
}
