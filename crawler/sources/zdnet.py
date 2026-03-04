"""
ZDNet Korea 크롤러
- RSS 피드 우선 시도, 실패 시 HTML 스크래핑 fallback
"""

import requests
import feedparser
from bs4 import BeautifulSoup
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime

from crawler.config import ZDNET_ARTICLES_LIMIT, REQUEST_TIMEOUT, USER_AGENT

ZDNET_RSS_URL = "https://feeds.feedburner.com/zdkorea"
ZDNET_NEWS_URL = "https://zdnet.co.kr/"


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


def _fetch_via_rss(crawl_batch: str) -> list[dict] | None:
    """RSS 피드로 수집 시도"""
    try:
        feed = feedparser.parse(ZDNET_RSS_URL, agent=USER_AGENT)
        if feed.bozo and not feed.entries:
            return None

        articles = []
        for entry in feed.entries[:ZDNET_ARTICLES_LIMIT]:
            url = entry.get("link")
            if not url:
                continue

            summary = entry.get("summary", "")
            if "<" in summary:
                summary = BeautifulSoup(summary, "html.parser").get_text(strip=True)
            if len(summary) > 500:
                summary = summary[:500] + "..."

            articles.append({
                "source": "zdnet",
                "category": "korea",
                "url": url,
                "title": entry.get("title", ""),
                "summary": summary,
                "author": entry.get("author", ""),
                "publishedAt": _parse_date(entry),
                "crawlBatch": crawl_batch,
            })

        return articles if articles else None
    except Exception:
        return None


def _fetch_via_scraping(crawl_batch: str) -> list[dict]:
    """HTML 스크래핑 fallback"""
    resp = requests.get(
        ZDNET_NEWS_URL,
        headers={"User-Agent": USER_AGENT},
        timeout=REQUEST_TIMEOUT,
    )
    resp.raise_for_status()
    resp.encoding = "utf-8"

    soup = BeautifulSoup(resp.text, "html.parser")
    articles = []

    # ZDNet Korea: /view/?no=YYYYMMDDXXXXXX 형식 링크 수집
    seen_urls = set()
    for link_tag in soup.select("a[href*='/view/?no=']")[:ZDNET_ARTICLES_LIMIT * 2]:
        url = link_tag.get("href", "")
        if url.startswith("/"):
            url = f"https://zdnet.co.kr{url}"

        if url in seen_urls:
            continue
        seen_urls.add(url)

        title = link_tag.get_text(strip=True)
        if not title or len(title) < 5:
            continue

        articles.append({
            "source": "zdnet",
            "category": "korea",
            "url": url,
            "title": title,
            "summary": "",
            "author": "",
            "publishedAt": None,
            "crawlBatch": crawl_batch,
        })

        if len(articles) >= ZDNET_ARTICLES_LIMIT:
            break

    return articles


def fetch(crawl_batch: str) -> list[dict]:
    """ZDNet Korea 기사 수집 (RSS → HTML 스크래핑 fallback)"""
    print("  [ZDNet] 수집 중...")

    # RSS 우선 시도
    articles = _fetch_via_rss(crawl_batch)
    if articles is not None:
        print(f"  [ZDNet] RSS: {len(articles)}개 수집 완료")
        return articles

    # RSS 실패 시 스크래핑
    print("  [ZDNet] RSS 실패 → HTML 스크래핑 시도...")
    try:
        articles = _fetch_via_scraping(crawl_batch)
        print(f"  [ZDNet] 스크래핑: {len(articles)}개 수집 완료")
        return articles
    except Exception as e:
        print(f"  [ZDNet] 스크래핑 실패: {e}")
        return []
