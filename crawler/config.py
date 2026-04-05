"""
크롤러 설정 모듈
- 태그 기반 확장 구조 (IT, 주식)
- 소스별 카테고리(global/korea) + 태그(IT/주식) 매핑

IT 글로벌: RSS 50 / IT 한국: 45
주식 글로벌: 50 / 주식 한국: 30
"""

# ── IT 글로벌 RSS 피드 ───────────────────────────
RSS_FEEDS = [
    ("https://techcrunch.com/feed/", "TechCrunch"),
    ("https://www.theverge.com/rss/index.xml", "The Verge"),
    ("https://feeds.arstechnica.com/arstechnica/index", "Ars Technica"),
    ("https://venturebeat.com/feed/", "VentureBeat"),
    ("https://www.technologyreview.com/feed/", "MIT Technology Review"),
]
RSS_ITEMS_PER_FEED = 10

# ── IT 한국 RSS 피드 ─────────────────────────────
# (URL, 소스이름, 수집제한)
KOREA_FEEDS = [
    ("https://yozm.wishket.com/magazine/feed/", "요즘IT", 30),
    ("https://www.itworld.co.kr/rss/", "ITWorld Korea", 15),
]

# ── 주식 글로벌 RSS 피드 ─────────────────────────
STOCK_FEEDS = [
    ("https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=20910258", "CNBC", 15),
    ("https://feeds.bloomberg.com/markets/news.rss", "Bloomberg", 15),
    ("https://finance.yahoo.com/news/rssindex", "Yahoo Finance", 10),
    ("https://seekingalpha.com/market_currents.xml", "Seeking Alpha", 10),
]

# ── 주식 한국 RSS 피드 ───────────────────────────
KOREA_STOCK_FEEDS = [
    ("https://www.hankyung.com/feed/finance", "한국경제", 30),
]

# ── 소스 → 카테고리·태그 매핑 ─────────────────────
# category: 지역 필터 (global / korea)
# tags: 주제 태그 (IT / 주식)
SOURCE_META = {
    # IT
    "rss":             {"category": "global", "tags": ["IT"]},
    "요즘IT":           {"category": "korea",  "tags": ["IT"]},
    "ITWorld Korea":    {"category": "korea",  "tags": ["IT"]},
    # 주식
    "CNBC":            {"category": "global", "tags": ["주식"]},
    "Bloomberg":       {"category": "global", "tags": ["주식"]},
    "Yahoo Finance":   {"category": "global", "tags": ["주식"]},
    "Seeking Alpha":   {"category": "global", "tags": ["주식"]},
    "한국경제":         {"category": "korea",  "tags": ["주식"]},
}

# 하위 호환용 (기존 코드에서 SOURCE_CATEGORY 참조하는 경우)
SOURCE_CATEGORY = {k: v["category"] for k, v in SOURCE_META.items()}

# ── 공통 설정 ────────────────────────────────────
REQUEST_TIMEOUT = 15
USER_AGENT = "nae-app-crawler/1.0"
