import { Suspense } from "react";
import Header from "@/components/layout/Header";
import DateFilter from "@/components/common/DateFilter";
import TopicDropdown from "@/components/common/TopicDropdown";
import TrendsFeed from "@/components/trends/TrendsFeed";
import { getArticles } from "@/lib/data";
import { getKSTDateString } from "@/lib/format";
import TrendsLoading from "./loading";

export const revalidate = 3600;

interface Props {
  searchParams: Promise<{ date?: string; topic?: string }>;
}

async function TrendsContent({ date, topic }: { date: string; topic: string }) {
  const { articles, hasMore } = await getArticles(20, date, topic);

  if (articles.length === 0) {
    return (
      <p className="text-text-secondary text-[14px]">
        해당 날짜의 {topic === "주식" ? "주식 " : ""}뉴스가 없습니다.
      </p>
    );
  }

  return (
    <TrendsFeed key={`${date}-${topic}`} initialArticles={articles} date={date} topic={topic} hasMore={hasMore} />
  );
}

export default async function TrendsPage({ searchParams }: Props) {
  const { date, topic: topicParam } = await searchParams;
  const todayKST = getKSTDateString();
  const currentDate = date || todayKST;
  const topic = topicParam || "IT";

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-[8px]">
          <Header title="Trends" />
          <TopicDropdown currentTopic={topic} />
        </div>
        <DateFilter currentDate={currentDate} todayDate={todayKST} />
      </div>
      <Suspense key={`${currentDate}-${topic}`} fallback={<TrendsLoading hideHeader />}>
        <TrendsContent date={currentDate} topic={topic} />
      </Suspense>
    </div>
  );
}
