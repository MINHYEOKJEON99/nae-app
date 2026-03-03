'use client';

import styled from '@emotion/styled';
import type { Todo } from '@/types/todo';

const Row = styled.div<{ $completed: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: 14px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const Checkbox = styled.button<{ $checked: boolean }>`
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 2px solid
    ${({ theme, $checked }) =>
      $checked ? theme.colors.accent : theme.colors.text.tertiary};
  background: ${({ theme, $checked }) =>
    $checked ? theme.colors.accent : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
`;

const CheckIcon = () => (
  <svg width={12} height={12} viewBox="0 0 12 12" fill="none">
    <path
      d="M2.5 6L5 8.5L9.5 3.5"
      stroke="#fff"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Content = styled.div`
  flex: 1;
  min-width: 0;
`;

const Title = styled.span<{ $completed: boolean }>`
  font-size: 14px;
  color: ${({ theme, $completed }) =>
    $completed ? theme.colors.text.tertiary : theme.colors.text.primary};
  text-decoration: ${({ $completed }) =>
    $completed ? 'line-through' : 'none'};
`;

const DeleteButton = styled.button`
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.tertiary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.button};
  }
`;

const DeleteIcon = () => (
  <svg width={14} height={14} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
    <path d="M3.5 3.5L10.5 10.5M10.5 3.5L3.5 10.5" />
  </svg>
);

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <Row $completed={todo.completed}>
      <Checkbox $checked={todo.completed} onClick={() => onToggle(todo._id)}>
        {todo.completed && <CheckIcon />}
      </Checkbox>
      <Content>
        <Title $completed={todo.completed}>{todo.title}</Title>
      </Content>
      <DeleteButton onClick={() => onDelete(todo._id)}>
        <DeleteIcon />
      </DeleteButton>
    </Row>
  );
}
