'use client';

import styled from '@emotion/styled';
import type { Todo } from '@/types/todo';
import TodoItem from './TodoItem';

const Group = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const TimeHeader = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  padding-left: 2px;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.foreground};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 2px ${({ theme }) => theme.spacing.md};
`;

interface TodoTimeGroupProps {
  time: string;
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoTimeGroup({
  time,
  todos,
  onToggle,
  onDelete,
}: TodoTimeGroupProps) {
  return (
    <Group>
      <TimeHeader>{time}</TimeHeader>
      <Card>
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </Card>
    </Group>
  );
}
