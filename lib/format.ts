/**
 * 현재 한국시간(KST, UTC+9) 기준 YYYY-MM-DD 문자열 반환
 */
export function getKSTDateString(): string {
  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  return kst.toISOString().split('T')[0];
}

/**
 * YYYY-MM-DD → "3월 4일 화요일" 형식으로 변환 (한국어)
 */
export function formatKoreanDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number);
  const d = new Date(Date.UTC(year, month - 1, day));
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekdays[d.getUTCDay()];
  return `${month}월 ${day}일 ${weekday}요일`;
}
