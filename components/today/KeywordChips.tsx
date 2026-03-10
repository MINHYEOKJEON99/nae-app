interface KeywordChipsProps {
  keywords: string[];
}

export default function KeywordChips({ keywords }: KeywordChipsProps) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingTop: 4, paddingBottom: 4 }}>
      {keywords.map((keyword) => (
        <span
          key={keyword}
          style={{ display: 'inline-flex', alignItems: 'center', paddingLeft: 12, paddingRight: 12, paddingTop: 6, paddingBottom: 6, background: 'var(--color-fg)', borderRadius: 9999, fontSize: 12, lineHeight: '18px', color: 'var(--color-text-secondary)', fontWeight: 500, whiteSpace: 'nowrap' }}
        >
          {keyword}
        </span>
      ))}
    </div>
  );
}
