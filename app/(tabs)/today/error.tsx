'use client';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function TodayError({ error, reset }: ErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center py-xl gap-md">
      <p className="text-body text-text-secondary">
        브리핑을 불러오는 중 오류가 발생했습니다.
      </p>
      <button
        onClick={reset}
        className="py-[10px] px-[20px] bg-accent text-white rounded-md text-[14px] font-semibold"
      >
        다시 시도
      </button>
    </div>
  );
}
