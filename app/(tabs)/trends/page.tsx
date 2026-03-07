import Header from '@/components/layout/Header';
import TopFiveSection from '@/components/trends/TopFiveSection';
import ArticleList from '@/components/trends/ArticleList';
import { getArticlesByCategory } from '@/lib/data';

export const revalidate = 300;

export default async function TrendsPage() {
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

      {/* 글로벌 섹션 */}
      <div className="mb-xl">
        <h2 className="text-[18px] font-bold text-text-primary mb-md">🌍 글로벌</h2>
        <TopFiveSection articles={globalBest5} title="Global BEST 5" />
        <ArticleList articles={globalRest} title="Global Top 뉴스" />
      </div>

      {/* 한국 섹션 */}
      <div className="mb-xl">
        <h2 className="text-[18px] font-bold text-text-primary mb-md">🇰🇷 한국</h2>
        <TopFiveSection articles={koreaBest5} title="Korea BEST 5" />
        <ArticleList articles={koreaRest} title="Korea Top 뉴스" />
      </div>
    </div>
  );
}
