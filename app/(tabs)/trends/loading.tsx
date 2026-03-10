import Header from "@/components/layout/Header";
import { SkeletonCard } from "@/components/common/Skeleton";

export default function TrendsLoading() {
  return (
    <div>
      <Header title="Trends" />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
