"""
Hacker News 크롤러
- Firebase API 사용 (무료, 인증 불필요)
- /topstories.json → 상위 N개 → /item/{id}.json 개별 조회
"""

import requests
from crawler.config import HN_TOP_STORIES_LIMIT, REQUEST_TIMEOUT, USER_AGENT

BASE_URL = "https://hacker-news.firebaseio.com/v0"
HEADERS = {"User-Agent": USER_AGENT}


def fetch(crawl_batch: str) -> list[dict]:
    """HN 상위 스토리 수집"""
    print(f"  [HN] 상위 {HN_TOP_STORIES_LIMIT}개 스토리 수집 중...")

    resp = requests.get(
        f"{BASE_URL}/topstories.json",
        headers=HEADERS,
        timeout=REQUEST_TIMEOUT,
    )
    resp.raise_for_status()
    story_ids = resp.json()[:HN_TOP_STORIES_LIMIT]

    articles = []
    for story_id in story_ids:
        try:
            item_resp = requests.get(
                f"{BASE_URL}/item/{story_id}.json",
                headers=HEADERS,
                timeout=REQUEST_TIMEOUT,
            )
            item_resp.raise_for_status()
            item = item_resp.json()

            if not item or item.get("type") != "story" or not item.get("url"):
                continue

            articles.append({
                "source": "hn",
                "category": "global",
                "url": item["url"],
                "title": item.get("title", ""),
                "summary": "",
                "author": item.get("by", ""),
                "publishedAt": None,
                "score": item.get("score", 0),
                "commentsCount": item.get("descendants", 0),
                "hnId": story_id,
                "crawlBatch": crawl_batch,
            })
        except Exception as e:
            print(f"  [HN] 스토리 {story_id} 수집 실패: {e}")
            continue

    print(f"  [HN] {len(articles)}개 수집 완료")
    return articles
