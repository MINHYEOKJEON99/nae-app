"""
크롤러 설정 모듈
- RSS 피드 목록, 소스별 수집 제한, 카테고리 매핑
"""

# RSS 피드 목록 (피드 URL, 소스 이름)
RSS_FEEDS = [
    ("https://techcrunch.com/feed/", "TechCrunch"),
    ("https://www.theverge.com/rss/index.xml", "The Verge"),
    ("https://feeds.arstechnica.com/arstechnica/index", "Ars Technica"),
    ("https://news.hada.io/rss/news", "GeekNews"),
]

# Hacker News 상위 N개 스토리
HN_TOP_STORIES_LIMIT = 30

# RSS 피드별 최근 N개 항목
RSS_ITEMS_PER_FEED = 20

# Reddit 서브레딧 목록
REDDIT_SUBREDDITS = ["programming", "technology", "webdev"]
REDDIT_POSTS_PER_SUB = 15

# ZDNet Korea 수집 제한
ZDNET_ARTICLES_LIMIT = 20

# 소스 → 카테고리 매핑
SOURCE_CATEGORY = {
    "hn": "global",
    "reddit": "global",
    "rss": "global",
    "zdnet": "korea",
}

# HTTP 요청 타임아웃 (초)
REQUEST_TIMEOUT = 15

# User-Agent
USER_AGENT = "nae-app-crawler/1.0"
