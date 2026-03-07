export function SkeletonLine({
  width,
  height,
}: {
  width?: string;
  height?: string;
}) {
  return (
    <div
      className="rounded-sm bg-button animate-shimmer"
      style={{
        width: width || '100%',
        height: height || '16px',
        backgroundImage:
          'linear-gradient(90deg, var(--color-button) 0px, var(--color-border) 40px, var(--color-button) 80px)',
        backgroundSize: '200px 100%',
      }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-fg rounded-lg p-lg mb-md flex flex-col gap-sm">
      <SkeletonLine width="60%" height="20px" />
      <SkeletonLine width="100%" height="14px" />
      <SkeletonLine width="80%" height="14px" />
    </div>
  );
}
