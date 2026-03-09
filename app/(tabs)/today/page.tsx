import Header from '@/components/layout/Header';
import BriefingCard from '@/components/today/BriefingCard';
import MainIssueList from '@/components/today/MainIssueList';
import ClosingSummary from '@/components/today/ClosingSummary';
import KeywordChips from '@/components/today/KeywordChips';
import { getBriefing } from '@/lib/data';
import { formatKoreanDate, getKSTDateString } from '@/lib/format';

export const revalidate = 300;

export default async function TodayPage() {
  const today = getKSTDateString();
  const briefing = await getBriefing(today);

  if (!briefing) {
    return (
      <div>
        <Header title="Today AI" />
        <p className="text-text-secondary text-[14px]">
          오늘의 브리핑이 아직 준비되지 않았습니다.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Header date={formatKoreanDate(briefing.date)} title="Today AI" />
      <BriefingCard intro={briefing.intro} />
      <MainIssueList issues={briefing.mainIssues} />
      <ClosingSummary text={briefing.closingSummary} />
      <KeywordChips keywords={briefing.keywords} />
    </div>
  );
}
