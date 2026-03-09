# 크롤러 파이프라인 문서

## 실행 흐름

```
main.py (수집) → transform.py (가공) → briefing.py (AI 요약)
```

GitHub Actions에서 하루 3회 자동 실행 (KST 08:00, 12:00, 18:00)

---

## 1단계: 수집 (`main.py`)

뉴스 소스에서 기사를 수집하여 MongoDB `raw_articles` 컬렉션에 저장한다.

- `crawlBatch`: `YYYY-MM-DD-HH` (KST) 형식으로 수집 시점 기록
- URL 기준 중복 방지 (`$setOnInsert` upsert)

### 뉴스 소스

| 소스 | 모듈 | 수량 | 카테고리 | 수집 방식 |
|------|------|------|----------|----------|
| Hacker News | `sources/hackernews.py` | 15개 | global | Firebase API (`/topstories.json`) |
| TechCrunch | `sources/rss.py` | 10개 | global | RSS 피드 |
| The Verge | `sources/rss.py` | 10개 | global | RSS 피드 |
| Ars Technica | `sources/rss.py` | 10개 | global | RSS 피드 |
| VentureBeat | `sources/rss.py` | 7개 | global | RSS 피드 |
| MIT Technology Review | `sources/rss.py` | 10개 | global | RSS 피드 |
| 요즘IT | `sources/zdnet.py` | 30개 | korea | RSS 피드 |
| GeekNews | `sources/zdnet.py` | 20개 | korea | RSS 피드 |
| ITWorld Korea | `sources/zdnet.py` | 15개 | korea | RSS 피드 |
| Byline Network | `sources/zdnet.py` | 15개 | korea | RSS 피드 |

> 글로벌 약 62개 + 한국 80개 = **총 약 142개**/배치

### `raw_articles` 스키마

```json
{
  "source": "hn | rss | 요즘IT | GeekNews | ...",
  "category": "global | korea",
  "url": "https://...",
  "title": "기사 제목",
  "summary": "기사 요약 (최대 500자)",
  "author": "작성자",
  "publishedAt": "2026-03-09T12:00:00+00:00 (ISO, UTC) | null",
  "crawlBatch": "2026-03-09-21",
  "feedName": "TechCrunch (RSS만 해당)",
  "score": 150,
  "commentsCount": 45,
  "hnId": 12345678
}
```

- `score`, `commentsCount`, `hnId`: HN 소스에만 존재
- `feedName`: RSS/한국RSS 소스에만 존재
- `publishedAt`: RSS에서 파싱, HN은 null

---

## 2단계: 가공 (`transform.py`)

`raw_articles` → `articles` 컬렉션으로 변환한다.

### 처리 과정

1. **필터링**: 기존 변환된 URL 제외, summary가 비어있는 기사 제외
2. **HN 인기도 보강**: 글로벌 RSS 기사를 HN Algolia API로 조회, 매칭되면 `hnScore` 추가
3. **한국어 번역**: 글로벌 기사의 제목/요약을 Google Translate로 한국어 번역 (이미 한국어면 스킵)
4. **trendScore 계산**: 소스별 정규화

### trendScore 계산 로직

| 소스 | 방식 | 점수 범위 |
|------|------|----------|
| HN | 자체 score 정규화 | 0~100 |
| RSS (HN 매칭) | hnScore 정규화 | 50~100 |
| RSS (HN 미매칭) | 순서 기반 | 0~49 |
| 한국 RSS | 순서 기반 | 0~100 |

- `isHot`: trendScore >= 80이면 true

### `articles` 스키마

```json
{
  "rawId": "ObjectId 문자열",
  "title": "기사 제목 (글로벌은 한국어 번역)",
  "url": "https://...",
  "category": "global | korea",
  "trendScore": 85,
  "aiSummaryShort": "요약 (글로벌은 한국어 번역)",
  "aiSummaryLong": "",
  "keywords": [],
  "isHot": true,
  "crawlBatch": "2026-03-09-21",
  "createdAt": "2026-03-09T12:00:00+00:00 (ISO, UTC)"
}
```

### 인덱스

- `trendScore` (내림차순) + `createdAt` (내림차순): 정렬용
- `category`: 필터용
- `url` (unique): 중복 방지

---

## 3단계: AI 브리핑 (`briefing.py`)

`articles`에서 상위 기사를 추출하여 Gemini로 일일 브리핑을 생성한다.

### 처리 과정

1. 글로벌 상위 20개 + 한국 상위 15개 기사 조회 (trendScore 내림차순)
2. Gemini (`gemini-2.5-flash`)에 프롬프트 전달
3. JSON 응답 파싱 후 `daily_briefings` 컬렉션에 upsert (date 기준)

### `daily_briefings` 스키마

```json
{
  "date": "2026-03-09 (KST 기준 YYYY-MM-DD)",
  "intro": "오늘의 IT 뉴스 전체 흐름 요약 (마크다운)",
  "mainIssues": [
    {
      "title": "이슈 제목",
      "summary": "이슈 상세 요약 (마크다운, 3~5문장)",
      "whyImportant": "왜 중요한지 1~2문장",
      "relatedArticleIds": []
    }
  ],
  "closingSummary": "마무리 한줄평 (마크다운)",
  "keywords": ["키워드1", "키워드2", "키워드3", "키워드4", "키워드5"],
  "createdAt": "2026-03-09T12:00:00+00:00 (ISO, UTC)"
}
```

- `mainIssues`: 글로벌+한국 혼합 가장 중요한 5개
- `date`: KST 기준 날짜, 프론트엔드에서 조회 키로 사용

---

## 환경 변수

| 변수 | 용도 |
|------|------|
| `MONGODB_URI` | MongoDB 연결 문자열 |
| `GEMINI_API_KEY` | Google Gemini API 키 (briefing에서 사용) |

---

## 설정 (`config.py`)

| 설정 | 값 | 설명 |
|------|-----|------|
| `RSS_ITEMS_PER_FEED` | 10 | 글로벌 RSS 피드당 수집 수 |
| `HN_TOP_STORIES_LIMIT` | 15 | HN 상위 스토리 수 |
| `REQUEST_TIMEOUT` | 15초 | HTTP 요청 타임아웃 |
| `USER_AGENT` | `nae-app-crawler/1.0` | 크롤러 User-Agent |

---

## 수동 실행

```bash
source crawler/.venv/bin/activate
export $(grep -v '^#' .env.local | xargs)

python -m crawler.main       # 1단계: 수집
python -m crawler.transform   # 2단계: 가공
python -m crawler.briefing    # 3단계: AI 요약
```
