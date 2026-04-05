import { SkeletonLine } from "@/components/common/Skeleton";

export default function ArticleDetailLoading() {
  return (
    <div>
      <div className="mb-md">
        <SkeletonLine width="80px" height="14px" />
      </div>

      <div className="bg-fg rounded-lg p-lg">
        <div className="flex items-center gap-[6px] mb-sm">
          <SkeletonLine width="50px" height="18px" />
          <SkeletonLine width="36px" height="18px" />
        </div>

        <div className="flex flex-col gap-[6px] mb-md">
          <SkeletonLine width="90%" height="20px" />
          <SkeletonLine width="70%" height="20px" />
        </div>

        <div className="flex flex-col gap-[6px] mb-lg">
          <SkeletonLine width="100%" height="14px" />
          <SkeletonLine width="100%" height="14px" />
          <SkeletonLine width="95%" height="14px" />
          <SkeletonLine width="85%" height="14px" />
          <SkeletonLine width="60%" height="14px" />
        </div>

        <div className="flex flex-wrap gap-[6px] mb-lg">
          <SkeletonLine width="60px" height="26px" />
          <SkeletonLine width="70px" height="26px" />
          <SkeletonLine width="55px" height="26px" />
        </div>

        <SkeletonLine width="100%" height="44px" />
      </div>
    </div>
  );
}
