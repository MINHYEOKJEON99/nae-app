import Header from "@/components/layout/Header";
import { SkeletonTodoItem } from "@/components/common/Skeleton";
import { formatKoreanDate, getKSTDateString } from "@/lib/format";

export default function TodoLoading() {
  return (
    <div>
      <Header date={formatKoreanDate(getKSTDateString())} title="할 일" />
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <SkeletonTodoItem />
        <SkeletonTodoItem />
        <SkeletonTodoItem />
      </div>
    </div>
  );
}
