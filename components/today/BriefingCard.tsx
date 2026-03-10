import Markdown from "./Markdown";

interface BriefingCardProps {
  intro: string;
}

export default function BriefingCard({ intro }: BriefingCardProps) {
  return (
    <div style={{ background: 'var(--color-fg)', borderRadius: 16, padding: 24, marginBottom: 16 }}>
      <span style={{ display: 'inline-block', fontSize: 12, lineHeight: '18px', color: 'var(--color-accent)', fontWeight: 600, marginBottom: 16 }}>
        오늘의 브리핑
      </span>
      <Markdown content={intro} />
    </div>
  );
}
