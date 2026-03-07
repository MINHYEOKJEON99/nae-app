import type { Article } from '@/types/article';
import ArticleCard from './ArticleCard';

interface ArticleListProps {
  articles: Article[];
  title?: string;
}

export default function ArticleList({
  articles,
  title = '더 많은 뉴스',
}: ArticleListProps) {
  if (articles.length === 0) return null;

  return (
    <section>
      <h2 className="text-subheading font-semibold text-text-primary mb-md">
        {title}
      </h2>
      {articles.map((article) => (
        <ArticleCard
          key={article._id}
          article={article}
          variant="compact"
        />
      ))}
    </section>
  );
}
