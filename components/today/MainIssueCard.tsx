import type { MainIssue } from '@/types/briefing';

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
        <h3 className="text-subheading font-semibold leading-subheading text-text-primary word-keep-all">
          {issue.title}
        </h3>
      </div>
      <p className="text-body leading-[1.7] text-text-primary mb-md word-keep-all">
        {issue.summary}
      </p>
      <div className="bg-button rounded-md p-md">
        <span className="block text-caption font-semibold text-accent mb-xs">
          왜 중요한가?
        </span>
        <p className="text-[13px] leading-[1.6] text-text-secondary word-keep-all">
          {issue.whyImportant}
        </p>
      </div>
    </div>
  );
}
