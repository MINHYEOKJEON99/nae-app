"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { formatKoreanDate } from "@/lib/format";

interface DateFilterProps {
  currentDate: string; // YYYY-MM-DD
  todayDate: string; // YYYY-MM-DD (KST 기준 오늘)
}

function shiftDate(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d + days));
  return date.toISOString().split("T")[0];
}

export default function DateFilter({ currentDate, todayDate }: DateFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isToday = currentDate === todayDate;

  const navigate = (date: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (date === todayDate) {
      params.delete("date");
    } else {
      params.set("date", date);
    }
    const query = params.toString();
    router.push(query ? `?${query}` : "?");
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <button
        onClick={() => navigate(shiftDate(currentDate, -1))}
        style={{
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '9999px',
          backgroundColor: 'var(--color-button)',
          color: 'var(--color-text-secondary)',
          border: 'none',
          cursor: 'pointer',
          transition: 'background-color 0.2s, color 0.2s',
        }}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <span style={{
        fontSize: '14px',
        lineHeight: '22px',
        fontWeight: 500,
        color: 'var(--color-text-primary)',
      }}>
        {formatKoreanDate(currentDate)}
      </span>
      <button
        onClick={() => navigate(shiftDate(currentDate, 1))}
        disabled={isToday}
        style={{
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '9999px',
          backgroundColor: 'var(--color-button)',
          color: 'var(--color-text-secondary)',
          border: 'none',
          cursor: isToday ? 'not-allowed' : 'pointer',
          opacity: isToday ? 0.3 : 1,
          transition: 'background-color 0.2s, color 0.2s',
        }}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}
