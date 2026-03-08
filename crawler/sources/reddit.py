"""
Reddit 크롤러
- 무료 JSON 엔드포인트 사용 (인증 불필요)
- reddit.com/r/{sub}/hot.json
"""

import requests
from crawler.config import (
    REDDIT_SUBREDDITS,
    REDDIT_POSTS_PER_SUB,
    REQUEST_TIMEOUT,
    USER_AGENT,
)

BASE_URL = "https://www.reddit.com"


def fetch(crawl_batch: str) -> list[dict]:
    """Reddit 서브레딧에서 인기 포스트 수집 (JSON 엔드포인트)"""
    headers = {"User-Agent": USER_AGENT}
    articles = []

    for subreddit in REDDIT_SUBREDDITS:
        try:
            print(f"  [Reddit] r/{subreddit} 수집 중...")
            resp = requests.get(
                f"{BASE_URL}/r/{subreddit}/hot.json",
                headers=headers,
                params={"limit": REDDIT_POSTS_PER_SUB + 5},
                timeout=REQUEST_TIMEOUT,
            )
            resp.raise_for_status()
            data = resp.json()

            count = 0
            for post in data.get("data", {}).get("children", []):
                if count >= REDDIT_POSTS_PER_SUB:
                    break

                post_data = post.get("data", {})

                if post_data.get("stickied"):
                    continue

                url = post_data.get("url", "")
                if url.startswith("/r/") or "reddit.com" in url:
                    url = f"{BASE_URL}{post_data.get('permalink', '')}"

                if not url:
                    continue

                articles.append({
                    "source": "reddit",
                    "category": "global",
                    "url": url,
                    "title": post_data.get("title", ""),
                    "summary": (post_data.get("selftext", "") or "")[:500],
                    "author": post_data.get("author", ""),
                    "publishedAt": None,
                    "score": post_data.get("score", 0),
                    "commentsCount": post_data.get("num_comments", 0),
                    "subreddit": subreddit,
                    "crawlBatch": crawl_batch,
                })
                count += 1

            print(f"  [Reddit] r/{subreddit}: {count}개 수집")

        except Exception as e:
            print(f"  [Reddit] r/{subreddit} 수집 실패: {e}")
            continue

    print(f"  [Reddit] 전체 {len(articles)}개 수집 완료")
    return articles
