import Header from '@/components/layout/Header';
import { SkeletonCard } from '@/components/common/Skeleton';

export default function TodoLoading() {
  return (
    <div>
      <Header title="Todo" />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
