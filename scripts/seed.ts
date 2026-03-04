/**
 * MongoDB 시드 스크립트
 *
 * mocks/ 디렉토리의 목업 데이터를 MongoDB에 삽입하고 인덱스를 생성
 * 실행: npm run seed (내부적으로 npx tsx scripts/seed.ts)
 *
 * 주의: 실행 시 기존 데이터를 모두 삭제하고 새로 삽입 (개발용)
 * .env.local의 MONGODB_URI 환경변수 필요
 */
import { MongoClient } from 'mongodb';
import { mockArticles } from '../mocks/articles';
import { mockBriefing } from '../mocks/briefings';

/** Todo 시드 데이터 — 'guest' 사용자의 샘플 할 일 목록 */
const SEED_TODOS = [
  {
    userId: 'guest',
    title: '아침 스탠드업 미팅',
    description: '팀 일일 미팅',
    time: '09:00',
    completed: true,
    date: '2026-03-04',
    createdAt: '2026-03-04T00:00:00Z',
  },
  {
    userId: 'guest',
    title: '이메일 확인 및 답장',
    description: '',
    time: '09:00',
    completed: false,
    date: '2026-03-04',
    createdAt: '2026-03-04T00:00:00Z',
  },
  {
    userId: 'guest',
    title: 'PR 리뷰 — 로그인 기능',
    description: 'feature/auth 브랜치 리뷰',
    time: '10:30',
    completed: false,
    date: '2026-03-04',
    createdAt: '2026-03-04T00:00:00Z',
  },
  {
    userId: 'guest',
    title: 'API 설계 문서 작성',
    description: '뉴스 크롤링 API 스펙',
    time: '14:00',
    completed: false,
    date: '2026-03-04',
    createdAt: '2026-03-04T00:00:00Z',
  },
  {
    userId: 'guest',
    title: '디자인 시스템 컴포넌트 정리',
    description: 'Button, Card, Input 컴포넌트',
    time: '14:00',
    completed: false,
    date: '2026-03-04',
    createdAt: '2026-03-04T00:00:00Z',
  },
  {
    userId: 'guest',
    title: '운동',
    description: '헬스장',
    time: '18:00',
    completed: false,
    date: '2026-03-04',
    createdAt: '2026-03-04T00:00:00Z',
  },
];

/**
 * 시드 실행 함수
 * 1. 각 컬렉션의 기존 데이터 전체 삭제
 * 2. 목업 데이터 삽입 (_id 필드 제외 — MongoDB가 자동 생성)
 * 3. 쿼리 성능을 위한 인덱스 생성
 */
async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI 환경변수가 설정되지 않았습니다.');
    console.error('.env.local 파일을 확인하세요.');
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('MongoDB 연결 성공');

    const db = client.db();

    // ── daily_briefings ──────────────────────────
    const briefingsCol = db.collection('daily_briefings');
    await briefingsCol.deleteMany({});
    // 목업의 _id는 문자열이므로 제거 → MongoDB ObjectId 자동 생성
    const { _id: _bId, ...briefingData } = mockBriefing;
    await briefingsCol.insertOne(briefingData);
    console.log('daily_briefings: 1건 삽입');

    // 날짜별 유니크 인덱스 — 하루에 하나의 브리핑만 존재
    await briefingsCol.createIndex({ date: 1 }, { unique: true });
    console.log('daily_briefings: { date: 1 } unique 인덱스 생성');

    // ── articles ─────────────────────────────────
    const articlesCol = db.collection('articles');
    await articlesCol.deleteMany({});
    const articleDocs = mockArticles.map(({ _id, ...rest }) => rest);
    await articlesCol.insertMany(articleDocs);
    console.log(`articles: ${articleDocs.length}건 삽입`);

    // 트렌드 점수 + 생성일 복합 인덱스 (기본 정렬용)
    await articlesCol.createIndex({ trendScore: -1, createdAt: -1 });
    // 카테고리 필터용 인덱스
    await articlesCol.createIndex({ category: 1 });
    console.log('articles: 인덱스 2개 생성');

    // ── todos ────────────────────────────────────
    const todosCol = db.collection('todos');
    await todosCol.deleteMany({});
    await todosCol.insertMany(SEED_TODOS);
    console.log(`todos: ${SEED_TODOS.length}건 삽입`);

    // 사용자+날짜 복합 인덱스 — Todo 조회 쿼리 최적화
    await todosCol.createIndex({ userId: 1, date: 1 });
    console.log('todos: { userId: 1, date: 1 } 인덱스 생성');

    console.log('\nSeed 완료!');
  } catch (err) {
    console.error('Seed 실패:', err);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seed();
