import Header from '@/components/layout/Header';
import TrendsToggle from '@/components/trends/TrendsToggle';
import { getArticlesByCategory } from '@/lib/data';

export const revalidate = 300;

export default async function TrendsPage() {
  await new Promise((r) => setTimeout(r, 3000)); // TODO: 로딩 테스트용, 삭제할 것
  const [globalArticles, koreaArticles] = await Promise.all([
    getArticlesByCategory('global', 30),
    getArticlesByCategory('korea', 30),
  ]);

  const globalBest5 = globalArticles.slice(0, 5);
  const globalRest = globalArticles.slice(5);
  const koreaBest5 = koreaArticles.slice(0, 5);
  const koreaRest = koreaArticles.slice(5);

  return (
    <div>
      <Header title="Trends" />
      <TrendsToggle
        globalBest5={globalBest5}
        globalRest={globalRest}
        koreaBest5={koreaBest5}
        koreaRest={koreaRest}
      />
    </div>
  );
}
