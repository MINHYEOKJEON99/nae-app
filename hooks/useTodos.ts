/**
 * Todo CRUD 커스텀 훅
 *
 * React Query로 서버 상태를 관리하며 낙관적 업데이트 대신
 * 뮤테이션 성공 시 쿼리 무효화(invalidation) 방식으로 동기화
 *
 * - query: 특정 날짜+사용자의 Todo 목록 조회
 * - addTodo: 새 Todo 생성 (POST)
 * - toggleTodo: 완료/미완료 토글 (PATCH)
 * - removeTodo: Todo 삭제 (DELETE)
 */
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

export function useTodos(date: string, userId: string) {
  const queryClient = useQueryClient();

  // 쿼리 키에 userId 포함 — 사용자별 캐시 분리
  const key = ['todos', date, userId];

  const query = useQuery({
    queryKey: key,
    queryFn: () => fetchTodos(date, userId),
    enabled: !!userId, // userId가 비어있으면 쿼리 비활성화
  });

  /** 새 Todo 추가 → 성공 시 목록 재조회 */
  const addTodo = useMutation({
    mutationFn: createTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });

  /** 완료 상태 토글 → 성공 시 목록 재조회 */
  const toggleTodo = useMutation({
    mutationFn: toggleTodoApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });

  /** Todo 삭제 → 성공 시 목록 재조회 */
  const removeTodo = useMutation({
    mutationFn: deleteTodoApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });

  return { ...query, addTodo, toggleTodo, removeTodo };
}
