interface HeaderProps {
  date?: string;
  title: string;
}

export default function Header({ date, title }: HeaderProps) {
  return (
    <header style={{ paddingTop: 16, paddingBottom: 16, marginBottom: 8 }}>
      {date && (
        <p
          style={{
            fontSize: 12,
            lineHeight: '18px',
            color: 'var(--color-text-secondary)',
            marginBottom: 2,
          }}
        >
          {date}
        </p>
      )}
      <h1
        style={{
          fontSize: 20,
          fontWeight: 700,
          lineHeight: '28px',
          color: 'var(--color-text-primary)',
          margin: 0,
        }}
      >
        {title}
      </h1>
    </header>
  );
}
