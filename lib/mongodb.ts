/**
 * MongoDB 연결 싱글톤 유틸리티
 *
 * - globalThis에 클라이언트를 캐싱하여 HMR(Hot Module Replacement) 시
 *   연결이 중복 생성되는 것을 방지
 * - API Route에서 getDb()를 호출하여 DB 인스턴스 획득
 */
import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI!;

if (!uri) {
  throw new Error('MONGODB_URI 환경변수가 설정되지 않았습니다.');
}

/** 캐싱할 MongoDB 클라이언트 상태 */
interface MongoCache {
  client: MongoClient | null;
  promise: Promise<MongoClient> | null;
}

// globalThis에 캐시 저장 — Next.js dev 모드에서 모듈이 리로드되어도 연결 유지
const g = globalThis as typeof globalThis & { _mongo?: MongoCache };

if (!g._mongo) {
  g._mongo = { client: null, promise: null };
}

/** 캐싱된 MongoClient를 반환하거나, 없으면 새로 연결 */
async function getClient(): Promise<MongoClient> {
  if (g._mongo!.client) return g._mongo!.client;

  if (!g._mongo!.promise) {
    g._mongo!.promise = new MongoClient(uri).connect();
  }

  g._mongo!.client = await g._mongo!.promise;
  return g._mongo!.client;
}

/** DB 인스턴스 반환 — MONGODB_URI의 기본 데이터베이스 사용 */
export async function getDb(): Promise<Db> {
  const client = await getClient();
  return client.db();
}
