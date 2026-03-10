import Header from "@/components/layout/Header";
import DateFilter from "@/components/common/DateFilter";
import BriefingCard from "@/components/today/BriefingCard";
import MainIssueList from "@/components/today/MainIssueList";
import ClosingSummary from "@/components/today/ClosingSummary";
import KeywordChips from "@/components/today/KeywordChips";
import { getBriefing } from "@/lib/data";
import { getKSTDateString, getKSTYesterdayString } from "@/lib/format";

export const revalidate = 300;

interface Props {
  searchParams: Promise<{ date?: string }>;
}

export default async function TodayPage({ searchParams }: Props) {
  const { date } = await searchParams;
  const todayKST = getKSTDateString();
  const currentDate = date || todayKST;

  let briefing = await getBriefing(currentDate);

  // 특정 날짜 지정이 없고 오늘 데이터가 없으면 전날 fallback
  if (!date && !briefing) {
    briefing = await getBriefing(getKSTYesterdayString());
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <Header title="Today AI" />
        <DateFilter currentDate={currentDate} todayDate={todayKST} />
      </div>
      {briefing ? (
        <>
          <BriefingCard intro={briefing.intro} />
          <MainIssueList issues={briefing.mainIssues} />
          <ClosingSummary text={briefing.closingSummary} />
          <KeywordChips keywords={briefing.keywords} />
        </>
      ) : (
        <p className="text-text-secondary text-[14px]">해당 날짜의 브리핑이 없습니다.</p>
      )}
    </div>
  );
}
