"""
크롤러 설정 모듈
- 태그 기반 확장 구조 (IT, 주식 등 추가 가능)
- 소스별 카테고리(global/korea) + 태그(IT/주식 등) 매핑

글로벌: RSS 50 + HN 15 + Reddit 15 = 80
한국: 요즘IT 30
"""

# ── 글로벌 RSS 피드 ──────────────────────────────
RSS_FEEDS = [
    ("https://techcrunch.com/feed/", "TechCrunch"),
    ("https://www.theverge.com/rss/index.xml", "The Verge"),
    ("https://feeds.arstechnica.com/arstechnica/index", "Ars Technica"),
    ("https://venturebeat.com/feed/", "VentureBeat"),
    ("https://www.technologyreview.com/feed/", "MIT Technology Review"),
]
RSS_ITEMS_PER_FEED = 10

# ── Hacker News ──────────────────────────────────
HN_TOP_STORIES_LIMIT = 15

# ── Reddit ───────────────────────────────────────
REDDIT_SUBREDDITS = ["programming", "technology", "webdev"]
REDDIT_POSTS_PER_SUB = 5  # 5 × 3 = 총 15개

# ── 한국 RSS 피드 ────────────────────────────────
# (URL, 소스이름, 수집제한)
KOREA_FEEDS = [
    ("https://yozm.wishket.com/magazine/feed/", "요즘IT", 30),
]

# ── 소스 → 카테고리·태그 매핑 ─────────────────────
# category: 프론트엔드 필터용 (global / korea)
# tags: 확장용 태그 (IT, 주식, 반도체 등)
SOURCE_META = {
    "hn":       {"category": "global", "tags": ["IT"]},
    "reddit":   {"category": "global", "tags": ["IT"]},
    "rss":      {"category": "global", "tags": ["IT"]},
    "요즘IT":    {"category": "korea",  "tags": ["IT"]},
    # ── 향후 확장 예시 ──
    # "한경":    {"category": "korea",  "tags": ["주식", "경제"]},
    # "인베스팅": {"category": "global", "tags": ["주식", "경제"]},
}

# 하위 호환용 (기존 코드에서 SOURCE_CATEGORY 참조하는 경우)
SOURCE_CATEGORY = {k: v["category"] for k, v in SOURCE_META.items()}

# ── 공통 설정 ────────────────────────────────────
REQUEST_TIMEOUT = 15
USER_AGENT = "nae-app-crawler/1.0"
