"""
MongoDB 연결 및 raw_articles upsert 모듈
- MONGODB_URI 환경변수 필수
- url 기준 unique 인덱스로 중복 방지
"""

import os
from pymongo import MongoClient, UpdateOne
from pymongo.errors import BulkWriteError


_client = None
_db = None


def get_db():
    """MongoDB 데이터베이스 연결 (싱글턴)"""
    global _client, _db
    if _db is not None:
        return _db

    uri = os.environ.get("MONGODB_URI")
    if not uri:
        raise RuntimeError("MONGODB_URI 환경변수가 설정되지 않았습니다")

    _client = MongoClient(uri)
    _db = _client.get_default_database()
    return _db


def ensure_indexes():
    """raw_articles 컬렉션에 url unique 인덱스 생성"""
    db = get_db()
    db.raw_articles.create_index("url", unique=True)


def upsert_articles(articles: list[dict]) -> dict:
    """
    raw_articles 컬렉션에 bulk upsert
    - url 기준 중복 시 업데이트하지 않음 ($setOnInsert)
    - 반환: { "new": int, "skipped": int }
    """
    if not articles:
        return {"new": 0, "skipped": 0}

    db = get_db()
    collection = db.raw_articles

    operations = []
    for article in articles:
        operations.append(
            UpdateOne(
                {"url": article["url"]},
                {"$setOnInsert": article},
                upsert=True,
            )
        )

    try:
        result = collection.bulk_write(operations, ordered=False)
        new_count = result.upserted_count
        skipped_count = len(articles) - new_count
        return {"new": new_count, "skipped": skipped_count}
    except BulkWriteError as e:
        # 중복 키 에러는 정상 (이미 존재하는 URL)
        new_count = e.details.get("nUpserted", 0)
        skipped_count = len(articles) - new_count
        return {"new": new_count, "skipped": skipped_count}


def close():
    """MongoDB 연결 종료"""
    global _client, _db
    if _client:
        _client.close()
        _client = None
        _db = None
