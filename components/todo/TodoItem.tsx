import type { Todo } from '@/types/todo';

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
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      paddingTop: 14,
      paddingBottom: 14,
      borderBottom: '1px solid var(--color-border)',
    }}>
      <button
        style={{
          flexShrink: 0,
          width: 22,
          height: 22,
          borderRadius: 9999,
          border: '2px solid',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.15s',
          cursor: 'pointer',
          padding: 0,
          ...(todo.completed
            ? { borderColor: 'var(--color-accent)', backgroundColor: 'var(--color-accent)' }
            : { borderColor: 'var(--color-text-tertiary)', backgroundColor: 'transparent' }
          ),
        }}
        onClick={() => onToggle(todo._id)}
      >
        {todo.completed && <CheckIcon />}
      </button>
      <div style={{ flex: 1, minWidth: 0 }}>
        <span
          style={{
            fontSize: 14,
            ...(todo.completed
              ? { color: 'var(--color-text-tertiary)', textDecoration: 'line-through' }
              : { color: 'var(--color-text-primary)', textDecoration: 'none' }
            ),
          }}
        >
          {todo.title}
        </span>
      </div>
      <button
        style={{
          flexShrink: 0,
          width: 28,
          height: 28,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-text-tertiary)',
          borderRadius: 8,
          transition: 'color 0.15s, background-color 0.15s',
          border: 'none',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          padding: 0,
        }}
        onClick={() => onDelete(todo._id)}
      >
        <DeleteIcon />
      </button>
    </div>
  );
}
