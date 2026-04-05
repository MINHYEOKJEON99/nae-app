"""
주식/금융 RSS 통합 크롤러
- config.STOCK_FEEDS (글로벌) + KOREA_STOCK_FEEDS (한국) 수집
- zdnet.py와 동일한 패턴 (SOURCE_META 기반 category/tags 매핑)
"""

import feedparser
from bs4 import BeautifulSoup
from datetime import timezone
from email.utils import parsedate_to_datetime

from crawler.config import STOCK_FEEDS, KOREA_STOCK_FEEDS, SOURCE_META, USER_AGENT


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
    """주식 RSS 피드(글로벌 + 한국) 수집"""
    all_articles = []
    all_feeds = STOCK_FEEDS + KOREA_STOCK_FEEDS

    for feed_url, feed_name, limit in all_feeds:
        try:
            print(f"  [주식RSS] {feed_name} 수집 중...")
            feed = feedparser.parse(feed_url, agent=USER_AGENT)

            if feed.bozo and not feed.entries:
                print(f"  [주식RSS] {feed_name} 파싱 실패: {feed.bozo_exception}")
                continue

            meta = SOURCE_META.get(feed_name, {"category": "global", "tags": ["주식"]})
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
                    "tags": meta.get("tags", ["주식"]),
                    "url": url,
                    "title": entry.get("title", ""),
                    "summary": summary,
                    "author": entry.get("author", ""),
                    "publishedAt": _parse_date(entry),
                    "feedName": feed_name,
                    "crawlBatch": crawl_batch,
                })
                count += 1

            print(f"  [주식RSS] {feed_name}: {count}개 수집")

        except Exception as e:
            print(f"  [주식RSS] {feed_name} 수집 실패: {e}")
            continue

    print(f"  [주식RSS] 전체 {len(all_articles)}개 수집 완료")
    return all_articles
