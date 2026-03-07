import Header from '@/components/layout/Header';
import TrendsContent from '@/components/trends/TrendsContent';
import { getInitialArticles } from '@/lib/data';

export const revalidate = 300;

export default async function TrendsPage() {
  const { items, hasMore } = await getInitialArticles();

  return (
    <div>
      <Header title="Trends" />
      <TrendsContent initialArticles={items} initialHasMore={hasMore} />
    </div>
  );
}
