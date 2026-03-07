"""
크롤러 설정 모듈
- RSS 피드 목록, 소스별 수집 제한, 카테고리 매핑

글로벌 RSS (50개): TechCrunch 10 + The Verge 10 + Ars 10 + VentureBeat 10 + MIT 10
Hacker News: 15
Reddit: 15 (5개 × 3 서브레딧)
한국: ZDNet 15 + Bloter 15
"""

# 글로벌 RSS 피드 목록 (피드 URL, 소스 이름)
RSS_FEEDS = [
    ("https://techcrunch.com/feed/", "TechCrunch"),
    ("https://www.theverge.com/rss/index.xml", "The Verge"),
    ("https://feeds.arstechnica.com/arstechnica/index", "Ars Technica"),
    ("https://venturebeat.com/feed/", "VentureBeat"),
    ("https://www.technologyreview.com/feed/", "MIT Technology Review"),
]

# RSS 피드별 최근 N개 항목
RSS_ITEMS_PER_FEED = 10

# Hacker News 상위 N개 스토리
HN_TOP_STORIES_LIMIT = 15

# Reddit 서브레딧 목록
REDDIT_SUBREDDITS = ["programming", "technology", "webdev"]
REDDIT_POSTS_PER_SUB = 5  # 5 × 3 = 총 15개

# ZDNet Korea 수집 제한
ZDNET_ARTICLES_LIMIT = 15

# Bloter 수집 제한
BLOTER_ARTICLES_LIMIT = 15

# 소스 → 카테고리 매핑
SOURCE_CATEGORY = {
    "hn": "global",
    "reddit": "global",
    "rss": "global",
    "zdnet": "korea",
    "bloter": "korea",
}

# HTTP 요청 타임아웃 (초)
REQUEST_TIMEOUT = 15

# User-Agent
USER_AGENT = "nae-app-crawler/1.0"
