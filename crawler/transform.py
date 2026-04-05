"""
raw_articles → articles 변환 스크립트

1. raw_articles에서 아직 변환되지 않은 기사 조회
2. 글로벌 RSS 기사: HN Algolia API로 인기도 보강
3. 글로벌 기사: 제목+요약 한국어 번역 (deep-translator, 무료)
4. trendScore 계산 (소스별 정규화)
5. articles 컬렉션에 upsert
"""

import os
import sys
import time
from datetime import datetime, timezone
from urllib.parse import quote

import requests
from pymongo import MongoClient, UpdateOne
from deep_translator import GoogleTranslator


def get_db():
    uri = os.environ.get("MONGODB_URI")
    if not uri:
        print("MONGODB_URI 환경변수가 설정되지 않았습니다")
        sys.exit(1)
    client = MongoClient(uri)
    return client, client.get_default_database()


# ── 번역 (무료 Google Translate) ─────────────────

translator = GoogleTranslator(source="en", target="ko")


def translate_to_ko(text: str) -> str:
    """영어 텍스트를 한국어로 번역 (이미 한국어면 그대로 반환)"""
    if not text:
        return text
    if any("\uac00" <= c <= "\ud7a3" for c in text):
        return text
    try:
        return translator.translate(text[:500]) or text
    except Exception as e:
        print(f"    [번역] 실패: {e}")
        return text


# ── HN Algolia API로 RSS 인기도 보강 ─────────────

HN_SEARCH_URL = "https://hn.algolia.com/api/v1/search"


def fetch_hn_score(url: str) -> int | None:
    """HN Algolia에서 해당 URL의 points 조회 (없으면 None)"""
    try:
        resp = requests.get(
            HN_SEARCH_URL,
            params={"query": url, "restrictSearchableAttributes": "url", "tags": "story"},
            timeout=5,
        )
        if resp.status_code != 200:
            return None
        hits = resp.json().get("hits", [])
        if not hits:
            return None
        return max(h.get("points", 0) for h in hits)
    except Exception:
        return None


def enrich_rss_with_hn_scores(articles: list[dict]) -> list[dict]:
    """RSS 기사들의 HN 인기도를 조회하여 hnScore 필드 추가"""
    rss_articles = [a for a in articles if a["source"] == "rss"]
    if not rss_articles:
        return articles

    print(f"\n  [HN Algolia] RSS {len(rss_articles)}개 기사 인기도 조회 중...")
    found = 0
    for i, art in enumerate(rss_articles):
        score = fetch_hn_score(art["url"])
        if score is not None:
            art["hnScore"] = score
            found += 1
        if (i + 1) % 10 == 0:
            print(f"    {i+1}/{len(rss_articles)} 조회 완료...")
        time.sleep(0.2)  # rate limit 방지

    print(f"  [HN Algolia] {found}/{len(rss_articles)}개 HN 매칭 완료\n")
    return articles


# ── trendScore 계산 ──────────────────────────────

def calculate_trend_scores(articles: list[dict]) -> list[dict]:
    by_source = {}
    for art in articles:
        src = art["source"]
        if src not in by_source:
            by_source[src] = []
        by_source[src].append(art)

    for src, group in by_source.items():
        if src in ("hn", "reddit"):
            # HN/Reddit: 자체 score 기반
            scores = [a.get("score", 0) for a in group]
            max_s = max(scores) if scores else 1
            min_s = min(scores) if scores else 0
            rng = max_s - min_s if max_s != min_s else 1
            for art in group:
                raw = art.get("score", 0)
                art["trendScore"] = round((raw - min_s) / rng * 100)
        elif src == "rss":
            # RSS: HN 매칭된 기사는 hnScore 기반, 나머지는 순서 기반
            hn_matched = [a for a in group if a.get("hnScore")]
            no_hn = [a for a in group if not a.get("hnScore")]

            if hn_matched:
                # hnScore 기반 정규화 (50~100 범위)
                scores = [a["hnScore"] for a in hn_matched]
                max_s = max(scores)
                min_s = min(scores)
                rng = max_s - min_s if max_s != min_s else 1
                for art in hn_matched:
                    art["trendScore"] = round(50 + (art["hnScore"] - min_s) / rng * 50)

            # HN 매칭 안 된 기사: 순서 기반 (0~49 범위)
            total = len(no_hn)
            for i, art in enumerate(no_hn):
                art["trendScore"] = round((total - i) / total * 49) if total > 0 else 0
        else:
            # 한국 RSS 등: 순서 기반
            total = len(group)
            for i, art in enumerate(group):
                art["trendScore"] = round((total - i) / total * 100)

    return articles


# ── 메인 변환 ────────────────────────────────────

def transform():
    client, db = get_db()

    raw_col = db["raw_articles"]
    art_col = db["articles"]

    existing_urls = set(doc["url"] for doc in art_col.find({}, {"url": 1}))
    print(f"기존 articles: {len(existing_urls)}개")

    raw_docs = list(raw_col.find())
    new_docs = [d for d in raw_docs if d["url"] not in existing_urls and d.get("summary", "").strip()]
    skipped = len(raw_docs) - len(existing_urls) - len(new_docs)
    print(f"raw_articles: {len(raw_docs)}개, 신규 변환 대상: {len(new_docs)}개 (요약 없음 {skipped}개 제외)")

    if not new_docs:
        print("변환할 기사가 없습니다.")
        client.close()
        return

    new_docs = enrich_rss_with_hn_scores(new_docs)
    new_docs = calculate_trend_scores(new_docs)

    operations = []
    for i, doc in enumerate(new_docs):
        title = doc["title"]
        summary = doc.get("summary", "").strip()

        # 글로벌 기사 → 한국어 번역
        if doc["category"] == "global":
            title = translate_to_ko(title)
            summary = translate_to_ko(summary)

        trend_score = doc.get("trendScore", 0)
        print(f"  [{i+1}/{len(new_docs)}] {title[:60]}")

        article = {
            "rawId": str(doc["_id"]),
            "title": title,
            "url": doc["url"],
            "category": doc["category"],
            "tags": doc.get("tags", ["IT"]),
            "trendScore": trend_score,
            "aiSummaryShort": summary,
            "aiSummaryLong": "",
            "keywords": [],
            "isHot": trend_score >= 80,
            "crawlBatch": doc.get("crawlBatch", ""),
            "createdAt": datetime.now(timezone.utc),
        }

        operations.append(
            UpdateOne(
                {"url": article["url"]},
                {"$setOnInsert": article},
                upsert=True,
            )
        )

    if operations:
        result = art_col.bulk_write(operations, ordered=False)
        print(f"\narticles 저장: {result.upserted_count}개 신규, "
              f"{len(operations) - result.upserted_count}개 스킵")

    art_col.create_index([("trendScore", -1), ("createdAt", -1)])
    art_col.create_index("category")
    art_col.create_index("tags")
    art_col.create_index("url", unique=True)
    print("인덱스 생성 완료")

    client.close()
    print("\n변환 완료!")


if __name__ == "__main__":
    env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".env.local")
    if os.path.exists(env_path):
        with open(env_path) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    key, val = line.split("=", 1)
                    os.environ.setdefault(key.strip(), val.strip())

    transform()
