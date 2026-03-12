'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import DateFilter from '@/components/common/DateFilter';
import BriefingCard from '@/components/today/BriefingCard';
import MainIssueList from '@/components/today/MainIssueList';
import ClosingSummary from '@/components/today/ClosingSummary';
import KeywordChips from '@/components/today/KeywordChips';
import { SkeletonCard } from '@/components/common/Skeleton';
import { useBriefing } from '@/hooks/useBriefing';
import { colors } from '@/lib/theme';
import { getKSTDateString } from '@/lib/format';

export default function TodayPage() {
  return (
    <Suspense>
      <TodayContent />
    </Suspense>
  );
}

function TodayContent() {
  const searchParams = useSearchParams();
  const todayKST = getKSTDateString();
  const currentDate = searchParams.get('date') || todayKST;

  const { data: briefing, isLoading, isError, refetch } = useBriefing(currentDate);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Header title="오늘의 요약" />
        <DateFilter currentDate={currentDate} todayDate={todayKST} />
      </div>
      {isLoading ? (
        <>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </>
      ) : isError ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 32,
            paddingBottom: 32,
            gap: 16,
          }}
        >
          <p style={{ fontSize: 14, lineHeight: '22px', color: colors.textSecondary }}>
            브리핑을 불러오는 중 오류가 발생했습니다.
          </p>
          <button
            onClick={() => refetch()}
            style={{
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 20,
              paddingRight: 20,
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
      ) : briefing ? (
        <>
          <BriefingCard intro={briefing.intro} />
          <MainIssueList issues={briefing.mainIssues} />
          <ClosingSummary text={briefing.closingSummary} />
          <KeywordChips keywords={briefing.keywords} />
        </>
      ) : (
        <p style={{ color: colors.textSecondary, fontSize: 14 }}>데이터가 아직 없어요.</p>
      )}
    </div>
  );
}
