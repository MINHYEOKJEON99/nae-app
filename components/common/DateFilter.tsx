"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { formatKoreanDate } from "@/lib/format";
import { IconButton } from "@toss/tds-mobile";
import { colors } from "@/lib/theme";

interface DateFilterProps {
  currentDate: string; // YYYY-MM-DD
  todayDate: string; // YYYY-MM-DD (KST 기준 오늘)
}

function shiftDate(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d + days));
  return date.toISOString().split("T")[0];
}

const chevronLeft = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>')}`;

const chevronRight = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>')}`;

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
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      <IconButton
        src={chevronLeft}
        variant="clear"
        iconSize={20}
        aria-label="이전 날짜"
        bgColor={colors.button}
        onClick={() => navigate(shiftDate(currentDate, -1))}
      />
      <span
        style={{
          fontSize: "16px",
          fontWeight: 500,
          color: colors.textPrimary,
        }}>
        {formatKoreanDate(currentDate)}
      </span>
      <div style={{ opacity: isToday ? 0.3 : 1 }}>
        <IconButton
          src={chevronRight}
          variant="clear"
          iconSize={20}
          aria-label="다음 날짜"
          bgColor={colors.button}
          onClick={() => !isToday && navigate(shiftDate(currentDate, 1))}
        />
      </div>
    </div>
  );
}
