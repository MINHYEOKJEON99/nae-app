import Header from '@/components/layout/Header';
import { SkeletonCard } from '@/components/common/Skeleton';
import { formatKoreanDate, getKSTDateString } from '@/lib/format';

export default function TodayLoading() {
  return (
    <div>
      <Header date={formatKoreanDate(getKSTDateString())} title="Today AI" />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
