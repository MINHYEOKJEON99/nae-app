'use client';

import { useMemo } from 'react';
import type { Todo } from '@/types/todo';
import TodoTimeGroup from './TodoTimeGroup';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  const grouped = useMemo(() => {
    const map = new Map<string, Todo[]>();
    const sorted = [...todos].sort((a, b) => {
      const ta = a.time || 'zzz';
      const tb = b.time || 'zzz';
      return ta.localeCompare(tb);
    });

    for (const todo of sorted) {
      const key = todo.time || '시간 없음';
      const existing = map.get(key);
      if (existing) {
        existing.push(todo);
      } else {
        map.set(key, [todo]);
      }
    }

    return Array.from(map.entries());
  }, [todos]);

  return (
    <>
      {grouped.map(([time, items]) => (
        <TodoTimeGroup
          key={time}
          time={time}
          todos={items}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </>
  );
}
