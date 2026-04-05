import Header from "@/components/layout/Header";
import { SkeletonLine } from "@/components/common/Skeleton";

function SkeletonRankedCard() {
  return (
    <div className="bg-fg rounded-lg p-lg mb-md">
      <div className="flex items-start gap-md mb-sm">
        <div className="w-[24px] h-[20px] rounded bg-button animate-shimmer shrink-0" style={{ backgroundImage: 'linear-gradient(90deg, var(--color-button) 0px, var(--color-border) 40px, var(--color-button) 80px)', backgroundSize: '200px 100%' }} />
        <SkeletonLine width="75%" height="17px" />
      </div>
      <div className="flex flex-col gap-[5px] mb-sm">
        <SkeletonLine width="100%" height="13px" />
        <SkeletonLine width="85%" height="13px" />
      </div>
      <div className="flex gap-[6px]">
        <SkeletonLine width="45px" height="18px" />
        <SkeletonLine width="50px" height="18px" />
      </div>
    </div>
  );
}

function SkeletonCompactCard() {
  return (
    <div className="bg-fg rounded-md p-md mb-sm">
      <div className="flex gap-[6px] mb-[4px]">
        <SkeletonLine width="45px" height="16px" />
      </div>
      <SkeletonLine width="80%" height="14px" />
      <div className="mt-[4px]">
        <SkeletonLine width="100%" height="12px" />
      </div>
    </div>
  );
}

export default function TrendsLoading({ hideHeader }: { hideHeader?: boolean }) {
  return (
    <div>
      {!hideHeader && (
        <div className="flex justify-between items-center">
          <Header title="Trends" />
        </div>
      )}
      <section className="mb-xl">
        <div className="mb-md"><SkeletonLine width="60px" height="18px" /></div>
        <SkeletonRankedCard />
        <SkeletonRankedCard />
        <SkeletonRankedCard />
        <SkeletonRankedCard />
        <SkeletonRankedCard />
      </section>
      <section>
        <div className="mb-md"><SkeletonLine width="70px" height="18px" /></div>
        <SkeletonCompactCard />
        <SkeletonCompactCard />
        <SkeletonCompactCard />
      </section>
    </div>
  );
}
