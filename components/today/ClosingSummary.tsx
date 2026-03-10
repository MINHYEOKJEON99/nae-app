import Markdown from "./Markdown";

interface ClosingSummaryProps {
  text: string;
}

export default function ClosingSummary({ text }: ClosingSummaryProps) {
  return (
    <div style={{ background: 'var(--color-fg)', borderRadius: 16, padding: 24, marginBottom: 16 }}>
      <Markdown content={text} />
    </div>
  );
}
