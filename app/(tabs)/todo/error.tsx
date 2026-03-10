"use client";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function TodoError({ error, reset }: ErrorProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 32,
      paddingBottom: 32,
      gap: 16,
    }}>
      <p style={{ fontSize: 14, lineHeight: '22px', color: 'var(--color-text-secondary)' }}>할 일을 불러오는 중 오류가 발생했습니다.</p>
      <button
        onClick={reset}
        style={{
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 20,
          paddingRight: 20,
          backgroundColor: 'var(--color-accent)',
          color: '#fff',
          borderRadius: 12,
          fontSize: 14,
          fontWeight: 600,
          border: 'none',
          cursor: 'pointer',
        }}
      >
        다시 시도
      </button>
    </div>
  );
}
