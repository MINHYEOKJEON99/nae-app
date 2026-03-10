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
    <div className="flex items-center gap-sm">
      <button
        onClick={() => navigate(shiftDate(currentDate, -1))}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-button text-text-secondary hover:bg-accent hover:text-white transition-colors">
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
      <span className="text-body font-medium text-text-primary">{formatKoreanDate(currentDate)}</span>
      <button
        onClick={() => navigate(shiftDate(currentDate, 1))}
        disabled={isToday}
        className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
          isToday
            ? "bg-button text-text-secondary opacity-30 cursor-not-allowed"
            : "bg-button text-text-secondary hover:bg-accent hover:text-white"
        }`}>
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
