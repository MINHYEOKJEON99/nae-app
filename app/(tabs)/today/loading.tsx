import Header from '@/components/layout/Header';
import { SkeletonCard } from '@/components/common/Skeleton';

export default function TodayLoading() {
  return (
    <div>
      <Header title="Today AI" />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
