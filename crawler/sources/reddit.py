"""
Reddit 크롤러
- OAuth 인증 필요 (REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET)
- 환경변수 없으면 graceful skip
"""

import os
import requests
from crawler.config import (
    REDDIT_SUBREDDITS,
    REDDIT_POSTS_PER_SUB,
    REQUEST_TIMEOUT,
    USER_AGENT,
)

TOKEN_URL = "https://www.reddit.com/api/v1/access_token"
API_BASE = "https://oauth.reddit.com"


def _get_access_token(client_id: str, client_secret: str) -> str | None:
    """Reddit OAuth 토큰 발급"""
    try:
        resp = requests.post(
            TOKEN_URL,
            auth=(client_id, client_secret),
            data={"grant_type": "client_credentials"},
            headers={"User-Agent": USER_AGENT},
            timeout=REQUEST_TIMEOUT,
        )
        resp.raise_for_status()
        return resp.json().get("access_token")
    except Exception as e:
        print(f"  [Reddit] 토큰 발급 실패: {e}")
        return None


def fetch(crawl_batch: str) -> list[dict]:
    """Reddit 서브레딧에서 인기 포스트 수집"""
    client_id = os.environ.get("REDDIT_CLIENT_ID")
    client_secret = os.environ.get("REDDIT_CLIENT_SECRET")

    if not client_id or not client_secret:
        print("  [Reddit] OAuth 환경변수 미설정 → 건너뜀")
        return []

    token = _get_access_token(client_id, client_secret)
    if not token:
        return []

    headers = {
        "Authorization": f"Bearer {token}",
        "User-Agent": USER_AGENT,
    }

    articles = []

    for subreddit in REDDIT_SUBREDDITS:
        try:
            print(f"  [Reddit] r/{subreddit} 수집 중...")
            resp = requests.get(
                f"{API_BASE}/r/{subreddit}/hot",
                headers=headers,
                params={"limit": REDDIT_POSTS_PER_SUB},
                timeout=REQUEST_TIMEOUT,
            )
            resp.raise_for_status()
            data = resp.json()

            count = 0
            for post in data.get("data", {}).get("children", []):
                post_data = post.get("data", {})

                # 고정 포스트, 자체 포스트 제외
                if post_data.get("stickied"):
                    continue

                url = post_data.get("url", "")
                # reddit 자체 링크면 permalink 사용
                if url.startswith("/r/") or "reddit.com" in url:
                    url = f"https://www.reddit.com{post_data.get('permalink', '')}"

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
