import Header from '@/components/layout/Header';
import TodoContent from '@/components/todo/TodoContent';
import { formatKoreanDate } from '@/lib/format';

export const dynamic = 'force-dynamic';

export default function TodoPage() {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <Header date={formatKoreanDate(today)} title="Todo" />
      <TodoContent date={today} />
    </div>
  );
}
