'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import DateFilter from '@/components/common/DateFilter';
import TrendsFeed from '@/components/trends/TrendsFeed';
import ArticleDetailView from '@/components/trends/ArticleDetailView';
import { getKSTDateString } from '@/lib/format';

export default function TrendsPage() {
  return (
    <Suspense>
      <TrendsContent />
    </Suspense>
  );
}

function TrendsContent() {
  const searchParams = useSearchParams();
  const todayKST = getKSTDateString();
  const currentDate = searchParams.get('date') || todayKST;
  const articleId = searchParams.get('id');

  if (articleId) {
    return <ArticleDetailView articleId={articleId} />;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Header title="IT 뉴스" />
        <DateFilter currentDate={currentDate} todayDate={todayKST} />
      </div>
      <TrendsFeed key={currentDate} date={currentDate} />
    </div>
  );
}
