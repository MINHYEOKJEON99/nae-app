import type { Article } from '@/types/article';
import ArticleCard from './ArticleCard';
import InfiniteScrollTrigger from '@/components/common/InfiniteScrollTrigger';
import { SkeletonCard } from '@/components/common/Skeleton';

interface ArticleListProps {
  articles: Article[];
  hasMore: boolean;
  isFetchingMore: boolean;
  onLoadMore: () => void;
}

export default function ArticleList({
  articles,
  hasMore,
  isFetchingMore,
  onLoadMore,
}: ArticleListProps) {
  return (
    <section>
      <h2 className="text-subheading font-semibold text-text-primary mb-md">
        더 많은 뉴스
      </h2>
      {articles.map((article) => (
        <ArticleCard
          key={article._id}
          article={article}
          variant="compact"
        />
      ))}
      {isFetchingMore && (
        <>
          <SkeletonCard />
          <SkeletonCard />
        </>
      )}
      <InfiniteScrollTrigger onTrigger={onLoadMore} enabled={hasMore && !isFetchingMore} />
    </section>
  );
}
