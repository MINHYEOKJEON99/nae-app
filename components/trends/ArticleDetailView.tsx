'use client';

import { useArticle } from '@/hooks/useArticle';
import ArticleDetail from '@/components/trends/ArticleDetail';
import { SkeletonCard } from '@/components/common/Skeleton';
import { colors } from '@/lib/theme';

export default function ArticleDetailView({ articleId }: { articleId: string }) {
  const { data: article, isLoading, isError, refetch } = useArticle(articleId);

  if (isLoading) {
    return (
      <>
        <SkeletonCard />
        <SkeletonCard />
      </>
    );
  }

  if (isError) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 32, gap: 16 }}>
        <p style={{ fontSize: 14, color: colors.textSecondary }}>기사를 불러오지 못했습니다.</p>
        <button
          onClick={() => refetch()}
          style={{
            padding: '10px 20px',
            backgroundColor: colors.accent,
            color: '#fff',
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          다시 시도
        </button>
      </div>
    );
  }

  if (!article) {
    return <p style={{ fontSize: 14, color: colors.textSecondary, paddingTop: 32, textAlign: 'center' }}>기사를 찾을 수 없습니다.</p>;
  }

  return <ArticleDetail article={article} />;
}
