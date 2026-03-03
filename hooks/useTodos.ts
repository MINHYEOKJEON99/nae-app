import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  fetchTodos,
  createTodo,
  toggleTodoApi,
  deleteTodoApi,
} from '@/lib/api';
import type { Todo } from '@/types/todo';

export function useTodos(date: string) {
  const queryClient = useQueryClient();
  const key = ['todos', date];

  const query = useQuery({
    queryKey: key,
    queryFn: () => fetchTodos(date),
  });

  const addTodo = useMutation({
    mutationFn: createTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });

  const toggleTodo = useMutation({
    mutationFn: toggleTodoApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });

  const removeTodo = useMutation({
    mutationFn: deleteTodoApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });

  return { ...query, addTodo, toggleTodo, removeTodo };
}
