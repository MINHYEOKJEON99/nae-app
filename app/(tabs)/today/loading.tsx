import Header from "@/components/layout/Header";
import { SkeletonLine } from "@/components/common/Skeleton";

function SkeletonBriefing() {
  return (
    <div className="bg-fg rounded-lg p-lg mb-md">
      <SkeletonLine width="80px" height="12px" />
      <div className="mt-sm flex flex-col gap-[6px]">
        <SkeletonLine width="100%" height="14px" />
        <SkeletonLine width="90%" height="14px" />
        <SkeletonLine width="70%" height="14px" />
      </div>
    </div>
  );
}

function SkeletonIssueCard() {
  return (
    <div className="bg-fg rounded-lg p-lg mb-md">
      <div className="flex items-start gap-md mb-sm">
        <div className="w-[24px] h-[24px] rounded-full bg-button animate-shimmer shrink-0" style={{ backgroundImage: 'linear-gradient(90deg, var(--color-button) 0px, var(--color-border) 40px, var(--color-button) 80px)', backgroundSize: '200px 100%' }} />
        <SkeletonLine width="60%" height="18px" />
      </div>
      <div className="flex flex-col gap-[6px]">
        <SkeletonLine width="100%" height="13px" />
        <SkeletonLine width="95%" height="13px" />
        <SkeletonLine width="80%" height="13px" />
      </div>
    </div>
  );
}

export default function TodayLoading({ hideHeader }: { hideHeader?: boolean }) {
  return (
    <div>
      {!hideHeader && (
        <div className="flex justify-between items-center">
          <Header title="Today AI" />
        </div>
      )}
      <SkeletonBriefing />
      <SkeletonIssueCard />
      <SkeletonIssueCard />
      <SkeletonIssueCard />
      <SkeletonIssueCard />
      <SkeletonIssueCard />
    </div>
  );
}
