'use client';

import type { MainIssue } from '@/types/briefing';
import MainIssueCard from './MainIssueCard';

interface MainIssueListProps {
  issues: MainIssue[];
}

export default function MainIssueList({ issues }: MainIssueListProps) {
  return (
    <>
      {issues.map((issue, i) => (
        <MainIssueCard key={i} issue={issue} index={i} />
      ))}
    </>
  );
}
