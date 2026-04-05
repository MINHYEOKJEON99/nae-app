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
    <div className="flex items-center gap-md py-[14px] border-b border-border last:border-b-0">
      <button
        aria-label={todo.completed ? '완료 취소' : '완료 처리'}
        className={`shrink-0 w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center transition-all duration-150 ${
          todo.completed
            ? 'border-accent bg-accent'
            : 'border-text-tertiary bg-transparent'
        }`}
        onClick={() => onToggle(todo._id)}
      >
        {todo.completed && <CheckIcon />}
      </button>
      <div className="flex-1 min-w-0">
        <span
          className={`text-[14px] ${
            todo.completed
              ? 'text-text-tertiary line-through'
              : 'text-text-primary no-underline'
          }`}
        >
          {todo.title}
        </span>
      </div>
      <button
        aria-label="할 일 삭제"
        className="shrink-0 w-7 h-7 flex items-center justify-center text-text-tertiary rounded-sm transition-colors duration-150 hover:bg-button"
        onClick={() => onDelete(todo._id)}
      >
        <DeleteIcon />
      </button>
    </div>
  );
}
