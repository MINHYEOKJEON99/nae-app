/**
 * API Base URL
 *
 * - 빌드(ait build): Vercel 배포 URL 사용
 * - 개발(granite dev): 로컬 dev 서버 사용 (빈 문자열 → 상대경로)
 */
export const API_BASE =
  typeof window !== 'undefined' && window.location.hostname !== 'localhost'
    ? 'https://nae-app-six.vercel.app'
    : '';
