'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import DateFilter from '@/components/common/DateFilter';
import TodoContent from '@/components/todo/TodoContent';
import { getKSTDateString } from '@/lib/format';

export default function TodoPage() {
  return (
    <Suspense>
      <TodoPageContent />
    </Suspense>
  );
}

function TodoPageContent() {
  const searchParams = useSearchParams();
  const todayKST = getKSTDateString();
  const currentDate = searchParams.get('date') || todayKST;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Header title="할 일" />
        <DateFilter currentDate={currentDate} todayDate={todayKST} />
      </div>
      <TodoContent date={currentDate} />
    </div>
  );
}
