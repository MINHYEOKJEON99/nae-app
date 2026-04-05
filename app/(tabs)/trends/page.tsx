import Header from "@/components/layout/Header";
import DateFilter from "@/components/common/DateFilter";
import TopicDropdown from "@/components/common/TopicDropdown";
import TrendsFeed from "@/components/trends/TrendsFeed";
import { getArticles } from "@/lib/data";
import { getKSTDateString } from "@/lib/format";

export const revalidate = 3600;

interface Props {
  searchParams: Promise<{ date?: string; topic?: string }>;
}

export default async function TrendsPage({ searchParams }: Props) {
  const { date, topic: topicParam } = await searchParams;
  const todayKST = getKSTDateString();
  const currentDate = date || todayKST;
  const topic = topicParam || "IT";

  const { articles, hasMore } = await getArticles(20, currentDate, topic);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-[8px]">
          <Header title="Trends" />
          <TopicDropdown currentTopic={topic} />
        </div>
        <DateFilter currentDate={currentDate} todayDate={todayKST} />
      </div>
      <TrendsFeed key={`${currentDate}-${topic}`} initialArticles={articles} date={currentDate} topic={topic} hasMore={hasMore} />
    </div>
  );
}
