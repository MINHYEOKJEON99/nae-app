import type { MainIssue } from '@/types/briefing';
import Markdown from './Markdown';

interface MainIssueCardProps {
  issue: MainIssue;
  index: number;
}

export default function MainIssueCard({ issue, index }: MainIssueCardProps) {
  return (
    <div style={{ background: 'var(--color-fg)', borderRadius: 16, padding: 24, marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
        <div style={{ flexShrink: 0, width: 28, height: 28, borderRadius: 9999, background: 'var(--color-accent)', color: '#ffffff', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {index + 1}
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 600, lineHeight: '24px', color: 'var(--color-text-primary)', wordBreak: 'keep-all' }}>
          {issue.title}
        </h3>
      </div>
      <Markdown content={issue.summary} />
      <div style={{ background: 'var(--color-button)', borderRadius: 12, padding: 16, marginTop: 16 }}>
        <span style={{ display: 'block', fontSize: 12, lineHeight: '18px', fontWeight: 600, color: 'var(--color-accent)', marginBottom: 4 }}>
          왜 중요한가?
        </span>
        <Markdown content={issue.whyImportant} style={{ fontSize: 13, color: 'var(--color-text-secondary)' }} />
      </div>
    </div>
  );
}
