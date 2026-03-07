import type { Todo } from '@/types/todo';
import TodoItem from './TodoItem';

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
    <div className="mb-md">
      <div className="text-[13px] font-semibold text-text-secondary mb-xs pl-[2px]">
        {time}
      </div>
      <div className="bg-fg rounded-lg px-md py-[2px]">
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
