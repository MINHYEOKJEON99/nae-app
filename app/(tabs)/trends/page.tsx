import Header from "@/components/layout/Header";
import DateFilter from "@/components/common/DateFilter";
import TrendsFeed from "@/components/trends/TrendsFeed";
import { getArticles } from "@/lib/data";
import { getKSTDateString } from "@/lib/format";

export const revalidate = 3600;

interface Props {
  searchParams: Promise<{ date?: string }>;
}

export default async function TrendsPage({ searchParams }: Props) {
  const { date } = await searchParams;
  const todayKST = getKSTDateString();
  const currentDate = date || todayKST;

  const { articles, hasMore } = await getArticles(20, currentDate);

  return (
    <div>
      <div className="flex justify-between items-center">
        <Header title="Trends" />
        <DateFilter currentDate={currentDate} todayDate={todayKST} />
      </div>
      <TrendsFeed key={currentDate} initialArticles={articles} date={currentDate} hasMore={hasMore} />
    </div>
  );
}
