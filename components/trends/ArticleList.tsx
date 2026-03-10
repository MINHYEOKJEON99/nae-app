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
      <h2 style={{
        fontSize: '16px',
        lineHeight: '24px',
        fontWeight: 600,
        color: 'var(--color-text-primary)',
        marginBottom: '16px',
      }}>
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
