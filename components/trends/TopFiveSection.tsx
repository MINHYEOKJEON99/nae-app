import type { Article } from '@/types/article';
import ArticleCard from './ArticleCard';

interface TopFiveSectionProps {
  articles: Article[];
}

export default function TopFiveSection({ articles }: TopFiveSectionProps) {
  const top5 = [...articles]
    .sort((a, b) => b.trendScore - a.trendScore)
    .slice(0, 5);

  return (
    <section className="mb-xl">
      <h2 className="text-subheading font-semibold text-text-primary mb-md">
        오늘의 BEST 5
      </h2>
      {top5.map((article, i) => (
        <ArticleCard
          key={article._id}
          article={article}
          variant="ranked"
          rank={i + 1}
        />
      ))}
    </section>
  );
}
