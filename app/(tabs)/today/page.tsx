import Header from "@/components/layout/Header";
import DateFilter from "@/components/common/DateFilter";
import BriefingCard from "@/components/today/BriefingCard";
import MainIssueList from "@/components/today/MainIssueList";
import ClosingSummary from "@/components/today/ClosingSummary";
import KeywordChips from "@/components/today/KeywordChips";
import { getBriefing } from "@/lib/data";
import { colors } from "@/lib/theme";
import { getKSTDateString } from "@/lib/format";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ date?: string }>;
}

export default async function TodayPage({ searchParams }: Props) {
  const { date } = await searchParams;
  const todayKST = getKSTDateString();
  const currentDate = date || todayKST;

  const briefing = await getBriefing(currentDate);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Header title="오늘의 요약" />
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
        <p style={{ color: colors.textSecondary, fontSize: 14 }}>데이터가 아직 없어요.</p>
      )}
    </div>
  );
}
