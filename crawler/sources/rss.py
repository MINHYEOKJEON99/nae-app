"""
RSS 피드 크롤러
- feedparser 라이브러리 사용
- 피드별 최근 N개 항목 수집
"""

import feedparser
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime

from crawler.config import RSS_FEEDS, RSS_ITEMS_PER_FEED, USER_AGENT


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
    """모든 RSS 피드에서 기사 수집"""
    articles = []

    for feed_url, feed_name in RSS_FEEDS:
        try:
            print(f"  [RSS] {feed_name} 수집 중...")
            feed = feedparser.parse(
                feed_url,
                agent=USER_AGENT,
            )

            if feed.bozo and not feed.entries:
                print(f"  [RSS] {feed_name} 파싱 실패: {feed.bozo_exception}")
                continue

            entries = feed.entries[:RSS_ITEMS_PER_FEED]
            count = 0

            for entry in entries:
                url = entry.get("link")
                if not url:
                    continue

                title = entry.get("title", "")
                summary = entry.get("summary", "")
                # HTML 태그 간단 제거
                if "<" in summary:
                    from bs4 import BeautifulSoup
                    summary = BeautifulSoup(summary, "html.parser").get_text(strip=True)
                # 요약이 너무 길면 잘라내기
                if len(summary) > 500:
                    summary = summary[:500] + "..."

                articles.append({
                    "source": "rss",
                    "category": "korea" if feed_name == "GeekNews" else "global",
                    "url": url,
                    "title": title,
                    "summary": summary,
                    "author": entry.get("author", ""),
                    "publishedAt": _parse_date(entry),
                    "feedName": feed_name,
                    "crawlBatch": crawl_batch,
                })
                count += 1

            print(f"  [RSS] {feed_name}: {count}개 수집")

        except Exception as e:
            print(f"  [RSS] {feed_name} 수집 실패: {e}")
            continue

    print(f"  [RSS] 전체 {len(articles)}개 수집 완료")
    return articles
