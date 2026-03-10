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
    <div style={{ marginBottom: 16 }}>
      <div style={{
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--color-text-secondary)',
        marginBottom: 4,
        paddingLeft: 2,
      }}>
        {time}
      </div>
      <div style={{
        backgroundColor: 'var(--color-fg)',
        borderRadius: 16,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 2,
        paddingBottom: 2,
      }}>
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
