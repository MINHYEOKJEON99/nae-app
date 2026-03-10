import Header from "@/components/layout/Header";
import DateFilter from "@/components/common/DateFilter";
import TrendsFeed from "@/components/trends/TrendsFeed";
import { getArticles } from "@/lib/data";
import { getKSTDateString } from "@/lib/format";

export const dynamic = "force-dynamic";

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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Header title="IT 뉴스" />
        <DateFilter currentDate={currentDate} todayDate={todayKST} />
      </div>
      <TrendsFeed key={currentDate} initialArticles={articles} date={currentDate} hasMore={hasMore} />
    </div>
  );
}
