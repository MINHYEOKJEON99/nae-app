"""
한국 RSS 통합 크롤러
- config.KOREA_FEEDS 기반으로 여러 한국 소스 수집
- 태그 기반 확장 가능 (IT, 주식 등)
"""

import feedparser
from bs4 import BeautifulSoup
from datetime import timezone
from email.utils import parsedate_to_datetime

from crawler.config import KOREA_FEEDS, SOURCE_META, USER_AGENT


def _parse_date(entry) -> str | None:
    """RSS 항목의 발행일을 ISO 문자열로 변환"""
    date_str = entry.get("published") or entry.get("updated")
    if not date_str:
        return None
    try:
        dt = parsedate_to_datetime(date_str)
        return dt.astimezone(timezone.utc).isoformat()
    except Exception:
        return date_str


def fetch(crawl_batch: str) -> list[dict]:
    """KOREA_FEEDS에 등록된 모든 한국 RSS 피드 수집"""
    all_articles = []

    for feed_url, feed_name, limit in KOREA_FEEDS:
        try:
            print(f"  [한국RSS] {feed_name} 수집 중...")
            feed = feedparser.parse(feed_url, agent=USER_AGENT)

            if feed.bozo and not feed.entries:
                print(f"  [한국RSS] {feed_name} 파싱 실패: {feed.bozo_exception}")
                continue

            meta = SOURCE_META.get(feed_name, {"category": "korea", "tags": ["IT"]})
            count = 0

            for entry in feed.entries[:limit]:
                url = entry.get("link")
                if not url:
                    continue

                summary = entry.get("summary", "")
                if "<" in summary:
                    summary = BeautifulSoup(summary, "html.parser").get_text(strip=True)
                if len(summary) > 500:
                    summary = summary[:500] + "..."

                all_articles.append({
                    "source": feed_name,
                    "category": meta["category"],
                    "tags": meta.get("tags", []),
                    "url": url,
                    "title": entry.get("title", ""),
                    "summary": summary,
                    "author": entry.get("author", ""),
                    "publishedAt": _parse_date(entry),
                    "feedName": feed_name,
                    "crawlBatch": crawl_batch,
                })
                count += 1

            print(f"  [한국RSS] {feed_name}: {count}개 수집")

        except Exception as e:
            print(f"  [한국RSS] {feed_name} 수집 실패: {e}")
            continue

    print(f"  [한국RSS] 전체 {len(all_articles)}개 수집 완료")
    return all_articles
