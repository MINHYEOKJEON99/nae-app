import Header from "@/components/layout/Header";
import DateFilter from "@/components/common/DateFilter";
import TodoContent from "@/components/todo/TodoContent";
import { getKSTDateString } from "@/lib/format";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ date?: string }>;
}

export default async function TodoPage({ searchParams }: Props) {
  const { date } = await searchParams;
  const todayKST = getKSTDateString();
  const currentDate = date || todayKST;

  return (
    <div>
      <div className="flex justify-between items-center">
        <Header title="Todo" />
        <DateFilter currentDate={currentDate} todayDate={todayKST} />
      </div>
      <TodoContent date={currentDate} />
    </div>
  );
}
