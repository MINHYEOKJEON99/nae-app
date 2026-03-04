'use client';

import Header from '@/components/layout/Header';
import BriefingCard from '@/components/today/BriefingCard';
import MainIssueList from '@/components/today/MainIssueList';
import ClosingSummary from '@/components/today/ClosingSummary';
import KeywordChips from '@/components/today/KeywordChips';
import { useBriefing } from '@/hooks/useBriefing';

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdays[d.getDay()];
  return `${month}월 ${day}일 ${weekday}요일`;
}

export default function TodayPage() {
  const today = new Date().toISOString().split('T')[0];
  const { data: briefing, isLoading } = useBriefing(today);

  if (isLoading || !briefing) {
    return (
      <div>
        <Header title="Today AI" />
        <p style={{ color: '#8b95a1', fontSize: '14px' }}>로딩 중...</p>
      </div>
    );
  }

  return (
    <div>
      <Header date={formatDate(briefing.date)} title="Today AI" />
      <BriefingCard intro={briefing.intro} />
      <MainIssueList issues={briefing.mainIssues} />
<ClosingSummary text={briefing.closingSummary} />
      <KeywordChips keywords={briefing.keywords} />
    </div>
  );
}
