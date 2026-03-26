import type { MainIssue } from '@/types/briefing';
import Markdown from './Markdown';

interface MainIssueCardProps {
  issue: MainIssue;
  index: number;
}

export default function MainIssueCard({ issue, index }: MainIssueCardProps) {
  return (
    <div className="bg-fg rounded-lg p-lg mb-md">
      <div className="flex items-start gap-md mb-md">
        <div className="shrink-0 w-7 h-7 rounded-full bg-accent text-white text-[13px] font-bold flex items-center justify-center">
          {index + 1}
        </div>
        <h2 className="text-subheading font-semibold leading-subheading text-text-primary word-keep-all">
          {issue.title}
        </h2>
      </div>
      <Markdown content={issue.summary} />
      <div className="bg-button rounded-md p-md mt-md">
        <span className="block text-caption font-semibold text-accent mb-xs">
          왜 중요한가?
        </span>
        <Markdown content={issue.whyImportant} className="text-[13px] text-text-secondary" />
      </div>
    </div>
  );
}
