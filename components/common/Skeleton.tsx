const shimmerKeyframes = `
@keyframes shimmer {
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
}
`;

function ShimmerStyle() {
  return <style>{shimmerKeyframes}</style>;
}

export function SkeletonLine({
  width,
  height,
}: {
  width?: string;
  height?: string;
}) {
  return (
    <>
      <ShimmerStyle />
      <div
        style={{
          width: width || '100%',
          height: height || '16px',
          borderRadius: '8px',
          backgroundColor: 'var(--color-button)',
          backgroundImage:
            'linear-gradient(90deg, var(--color-button) 0px, var(--color-border) 40px, var(--color-button) 80px)',
          backgroundSize: '200px 100%',
          backgroundRepeat: 'no-repeat',
          animation: 'shimmer 1.5s infinite linear',
        }}
      />
    </>
  );
}

export function SkeletonCard() {
  return (
    <div style={{
      backgroundColor: 'var(--color-fg)',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '16px',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '8px',
    }}>
      <SkeletonLine width="60%" height="20px" />
      <SkeletonLine width="100%" height="14px" />
      <SkeletonLine width="80%" height="14px" />
    </div>
  );
}

export function SkeletonTodoItem() {
  return (
    <div>
      <ShimmerStyle />
      <SkeletonLine width="40px" height="12px" />
      <div style={{
        backgroundColor: 'var(--color-fg)',
        borderRadius: '12px',
        padding: '16px',
        marginTop: '6px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <div
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '9999px',
            backgroundColor: 'var(--color-button)',
            backgroundImage:
              'linear-gradient(90deg, var(--color-button) 0px, var(--color-border) 40px, var(--color-button) 80px)',
            backgroundSize: '200px 100%',
            backgroundRepeat: 'no-repeat',
            animation: 'shimmer 1.5s infinite linear',
            flexShrink: 0,
          }}
        />
        <SkeletonLine width="60%" height="16px" />
      </div>
    </div>
  );
}
