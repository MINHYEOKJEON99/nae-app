import Header from '@/components/layout/Header';
import { SkeletonTodoItem } from '@/components/common/Skeleton';
import { formatKoreanDate, getKSTDateString } from '@/lib/format';

export default function TodoLoading() {
  return (
    <div>
      <Header date={formatKoreanDate(getKSTDateString())} title="Todo" />
      <div className="flex flex-col gap-3">
        <SkeletonTodoItem />
        <SkeletonTodoItem />
        <SkeletonTodoItem />
      </div>
    </div>
  );
}
