import { Suspense } from "react";
import Header from "@/components/layout/Header";
import DateFilter from "@/components/common/DateFilter";
import TopicDropdown from "@/components/common/TopicDropdown";
import BriefingCard from "@/components/today/BriefingCard";
import MainIssueList from "@/components/today/MainIssueList";
import ClosingSummary from "@/components/today/ClosingSummary";
import KeywordChips from "@/components/today/KeywordChips";
import { getBriefing } from "@/lib/data";
import { getKSTDateString, getKSTYesterdayString } from "@/lib/format";
import TodayLoading from "./loading";

export const revalidate = 3600;

interface Props {
  searchParams: Promise<{ date?: string; topic?: string }>;
}

async function TodayContent({ date, currentDate, topic }: { date?: string; currentDate: string; topic: string }) {
  let briefing = await getBriefing(currentDate, topic);

  if (!date && !briefing) {
    briefing = await getBriefing(getKSTYesterdayString(), topic);
  }

  if (!briefing) {
    return (
      <p className="text-text-secondary text-[14px]">
        해당 날짜의 {topic === "주식" ? "주식 " : ""}브리핑이 없습니다.
      </p>
    );
  }

  return (
    <>
      <BriefingCard intro={briefing.intro} />
      <MainIssueList issues={briefing.mainIssues} />
      <ClosingSummary text={briefing.closingSummary} />
      <KeywordChips keywords={briefing.keywords} />
    </>
  );
}

export default async function TodayPage({ searchParams }: Props) {
  const { date, topic: topicParam } = await searchParams;
  const todayKST = getKSTDateString();
  const currentDate = date || todayKST;
  const topic = topicParam || "IT";

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-[8px]">
          <Header title="Today AI" />
          <TopicDropdown currentTopic={topic} />
        </div>
        <DateFilter currentDate={currentDate} todayDate={todayKST} />
      </div>
      <Suspense key={`${currentDate}-${topic}`} fallback={<TodayLoading hideHeader />}>
        <TodayContent date={date} currentDate={currentDate} topic={topic} />
      </Suspense>
    </div>
  );
}
