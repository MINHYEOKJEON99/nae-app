import Header from "@/components/layout/Header";
import { SkeletonCard } from "@/components/common/Skeleton";

export default function TrendsLoading() {
  return (
    <div>
      <Header title="IT 뉴스" />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
