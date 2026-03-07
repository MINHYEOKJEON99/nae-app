export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-xl gap-sm">
      <div className="text-[40px] mb-sm opacity-40">
        <svg width={48} height={48} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <rect x="8" y="8" width="32" height="32" rx="4" />
          <path d="M16 24h16" />
          <path d="M24 16v16" />
        </svg>
      </div>
      <p className="text-body text-text-tertiary">오늘 할 일을 추가해보세요</p>
    </div>
  );
}
