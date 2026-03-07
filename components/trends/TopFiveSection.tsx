import type { Article } from '@/types/article';
import ArticleCard from './ArticleCard';

interface TopFiveSectionProps {
  articles: Article[];
  title?: string;
}

export default function TopFiveSection({ articles, title = '오늘의 BEST 5' }: TopFiveSectionProps) {
  const top5 = articles.slice(0, 5);

  return (
    <section className="mb-xl">
      <h2 className="text-subheading font-semibold text-text-primary mb-md">
        {title}
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
