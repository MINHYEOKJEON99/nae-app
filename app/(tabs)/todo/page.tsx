'use client';

import Header from '@/components/layout/Header';
import TodoInput from '@/components/todo/TodoInput';
import TodoList from '@/components/todo/TodoList';
import EmptyState from '@/components/todo/EmptyState';
import { useTodos } from '@/hooks/useTodos';

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdays[d.getDay()];
  return `${month}월 ${day}일 ${weekday}요일`;
}

export default function TodoPage() {
  const today = new Date().toISOString().split('T')[0];
  const { data: todos, isLoading, addTodo, toggleTodo, removeTodo } = useTodos(today);

  const handleAdd = (title: string, time: string) => {
    addTodo.mutate({
      userId: 'guest',
      title,
      description: '',
      time,
      completed: false,
      date: today,
    });
  };

  const handleToggle = (id: string) => {
    toggleTodo.mutate(id);
  };

  const handleDelete = (id: string) => {
    removeTodo.mutate(id);
  };

  return (
    <div>
      <Header date={formatDate(today)} title="Todo" />
      <TodoInput onAdd={handleAdd} />
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
