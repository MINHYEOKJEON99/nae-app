/**
 * 익명 사용자 ID 유틸리티
 *
 * - 로그인 없이 localStorage에 UUID를 저장하여 사용자를 식별
 * - 최초 호출 시 crypto.randomUUID()로 생성, 이후 재사용
 * - SSR 환경(서버)에서는 'server' 문자열 반환 (실제 사용 X)
 */

const KEY = 'nae_user_id';

/** localStorage에서 userId를 가져오거나, 없으면 새로 생성하여 저장 */
export function getUserId(): string {
  // SSR 환경 방어 — 서버에서는 window/localStorage 접근 불가
  if (typeof window === 'undefined') return 'server';

  let id = localStorage.getItem(KEY);
  if (!id) {
    id = typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          const r = (Math.random() * 16) | 0;
          return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
        });
    localStorage.setItem(KEY, id);
  }
  return id;
}
