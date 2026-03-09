import Header from "@/components/layout/Header";
import { SkeletonCard } from "@/components/common/Skeleton";

export default function TrendsLoading() {
  return (
    <div>
      <Header title="Trends" />
      <div className="flex gap-sm mb-lg">
        <button className={`px-md py-xs rounded-full text-body font-semibold transition-colors bg-accent text-white `}>
          Ko
        </button>
        <button
          className={`px-md py-xs rounded-full text-body font-semibold transition-colors bg-button text-text-secondary
          `}>
          global
        </button>
      </div>
      <h2 className="text-subheading font-semibold text-text-primary mb-md">🔥 Korea BEST 5 🔥</h2>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
