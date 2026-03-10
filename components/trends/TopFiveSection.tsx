import type { Article } from '@/types/article';
import { colors } from "@/lib/theme";
import ArticleCard from './ArticleCard';

interface TopFiveSectionProps {
  articles: Article[];
  title?: string;
}

export default function TopFiveSection({ articles, title = '오늘의 BEST 5' }: TopFiveSectionProps) {
  const top5 = articles.slice(0, 5);

  return (
    <section style={{ marginBottom: '32px' }}>
      <h2 style={{
        fontSize: '16px',
        lineHeight: '24px',
        fontWeight: 600,
        color: colors.textPrimary,
        marginBottom: '16px',
      }}>
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
