export default function EmptyState() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 32, paddingBottom: 32, gap: 8 }}>
      <div style={{ fontSize: 40, marginBottom: 8, opacity: 0.4 }}>
        <svg width={48} height={48} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <rect x="8" y="8" width="32" height="32" rx="4" />
          <path d="M16 24h16" />
          <path d="M24 16v16" />
        </svg>
      </div>
      <p style={{ fontSize: 14, lineHeight: '22px', color: 'var(--color-text-tertiary)' }}>오늘 할 일을 추가해보세요</p>
    </div>
  );
}
