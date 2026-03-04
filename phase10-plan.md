# Phase 10: AI 뉴스 가공 + 기사 상세 뷰

## Context
Phase 9에서 raw_articles 수집 완료 (HN, RSS).
현재 프론트엔드는 `articles` + `daily_briefings` 컬렉션을 읽지만, 실제 데이터 없음 (seed 데이터만 존재).
기사 클릭 시 현재는 외부 링크(`target="_blank"`)로 이동 → **앱 내 상세 뷰**로 변경.

## 데이터 흐름
```
raw_articles (Phase 9에서 수집)
  → 1. 본문 크롤링: url 접속 → 본문 텍스트 추출 → raw_articles.content에 저장
  → 2. AI 가공: title + content → trendScore, aiSummary, keywords 생성 → articles 컬렉션
  → 3. 브리핑 생성: 상위 articles → daily_briefings 컬렉션
  → 4. 프론트: 기사 상세 페이지 (AI 요약 + 원문 본문)
```

## 결정 사항
- **AI 모델**: OpenAI GPT-4o-mini (비용 효율 + 한국어 품질)
- **실행 시점**: 크롤링 직후 (같은 GitHub Actions job에서 연속 실행)
- **비용 제어**: 배치당 1회만 가공, 이미 가공된 raw_articles 스킵
- **Fallback**: API 키 없으면 graceful skip (크롤링은 정상 동작)
- **원문 보기**: 앱 내 상세 페이지에서 AI 요약 + 원문 본문 표시
- **Reddit/ZDNet**: 이번 Phase에서는 제외 (추후 개선)

---

## 구현 순서

### 1. 본문 크롤링 추가 (content 수집)

크롤러가 기사 URL에 접속하여 본문 텍스트를 추출, `raw_articles.content` 필드에 저장.

**새 모듈**: `crawler/sources/content_fetcher.py`
- `requests` + `BeautifulSoup`로 본문 추출
- `<article>`, `<main>`, `.post-content` 등 일반적인 셀렉터 시도
- 추출 실패 시 `content: null` (AI 요약은 title + summary로 대체)
- 본문 최대 5000자 제한 (토큰 절약)

**처리 시점**: 크롤링 완료 후, AI 가공 전
```python
for raw_article in raw_articles_without_content:
    content = fetch_content(raw_article["url"])
    db.raw_articles.update_one({"_id": id}, {"$set": {"content": content}})
```

### 2. Python 모듈 구조
```
crawler/
├── ... (기존 파일)
├── sources/
│   ├── content_fetcher.py    # 본문 크롤링 (NEW)
│   └── ... (기존)
├── processor/
│   ├── __init__.py
│   ├── ai_client.py          # OpenAI API 래퍼
│   ├── article_processor.py  # raw → articles 변환
│   ├── briefing_generator.py # articles → daily_briefings 생성
│   └── prompts.py            # AI 프롬프트 템플릿
└── process.py                # 가공 엔트리포인트
```

### 3. AI 클라이언트 (`ai_client.py`)
- `openai` 라이브러리 사용
- `OPENAI_API_KEY` 환경변수 필수
- rate limit 대응: 재시도 로직 (exponential backoff)
- 토큰 사용량 로깅

### 4. 기사 가공 (`article_processor.py`)
raw_articles에서 아직 가공되지 않은 기사를 찾아 articles로 변환.

**처리 로직**:
1. `raw_articles`에서 현재 배치(crawlBatch) 기사 조회
2. 이미 `articles`에 존재하는 URL 제외 (중복 방지)
3. 5~10개씩 배치로 묶어 AI에 전송 (토큰 절약)
4. AI 응답 → articles 컬렉션에 삽입

**articles 컬렉션 필드** (기존 타입 + content 추가):
| 필드 | 설명 |
|------|------|
| `rawId` | raw_articles._id 참조 |
| `title` | 원본 제목 |
| `url` | 원문 URL |
| `content` | 원문 본문 텍스트 (raw_articles에서 복사) |
| `category` | raw_articles에서 그대로 |
| `trendScore` | 0~100 AI 생성 중요도 점수 |
| `aiSummaryShort` | 1줄 요약 (한국어, 50자 이내) |
| `aiSummaryLong` | 3~4문장 상세 요약 (한국어) |
| `keywords` | 관련 키워드 3~5개 (한국어) |
| `isHot` | trendScore 80 이상이면 true |
| `crawlBatch` | 배치 ID |
| `createdAt` | 생성 시각 |

**프롬프트 (배치 처리)**:
```
다음 IT 뉴스 기사들을 분석해주세요.
각 기사에 대해 JSON 형식으로 응답해주세요:
- trendScore (0-100): 개발자에게 중요한 정도
- aiSummaryShort: 한국어 1줄 요약 (50자 이내)
- aiSummaryLong: 한국어 3-4문장 상세 요약
- keywords: 한국어 키워드 3-5개 배열

기사 목록:
[{title, url, source, content(본문 일부), score}...]
```

### 5. 브리핑 생성 (`briefing_generator.py`)
가공된 articles 중 오늘자 상위 기사를 바탕으로 daily_briefings 생성.

**처리 로직**:
1. 오늘 날짜(KST)의 `articles`에서 trendScore 상위 20개 조회
2. 이미 오늘자 `daily_briefings` 존재하면 스킵
3. AI에 상위 기사 목록 전송 → 브리핑 생성

**프롬프트**:
```
당신은 IT 뉴스 AI 앵커입니다.
오늘의 주요 IT 뉴스를 바탕으로 브리핑을 작성해주세요.

톤: 친근하지만 전문적인 대본 형식
대상: 바쁜 개발자

오늘의 주요 기사:
[{title, aiSummaryShort, trendScore, keywords}...]

JSON 형식으로 응답:
{
  "intro": "오늘의 인트로...",
  "mainIssues": [
    { "title": "...", "summary": "...", "whyImportant": "..." }
  ],
  "closingSummary": "...",
  "keywords": ["...", "..."]
}
```

### 6. 가공 엔트리포인트 (`process.py`)
```python
# 실행 순서
1. 본문 크롤링 (content_fetcher) — raw_articles.content 채우기
2. raw_articles → articles 변환 (article_processor)
3. articles → daily_briefings 생성 (briefing_generator)
4. 결과 요약 로깅
```

---

## 프론트엔드: 기사 상세 페이지

### 7. Article 타입 확장
**`types/article.ts` 수정**:
```typescript
export interface Article {
  // ... 기존 필드
  content: string | null;  // 원문 본문 (추가)
}
```

### 8. API Route 추가
**`app/api/articles/[id]/route.ts`** (NEW):
```typescript
GET /api/articles/:id → Article (content 포함)
```
- `_id`로 단일 기사 조회
- content 필드 포함하여 반환

### 9. 기사 상세 페이지
**`app/(tabs)/article/[id]/page.tsx`** (NEW):
```
┌─────────────────────────┐
│  ← 뒤로가기              │  ← 헤더
├─────────────────────────┤
│                         │
│  기사 제목               │  ← 큰 텍스트
│  [AI] [클라우드] [투자]   │  ← 키워드 칩
│                         │
│ ┌─────────────────────┐ │
│ │ 🤖 AI 요약           │ │  ← aiSummaryLong
│ │                     │ │     배경색 구분된 카드
│ │ 3~4문장 상세 요약     │ │
│ └─────────────────────┘ │
│                         │
│  ── 원문 ──────────────  │  ← 구분선
│                         │
│  본문 텍스트가 여기에     │  ← content
│  표시됩니다. 크롤링된     │     일반 텍스트 렌더링
│  원문 내용이 그대로       │
│  보여집니다...           │
│                         │
│  [원문 보기 →]           │  ← 외부 링크 (url)
│                         │
└─────────────────────────┘
```

### 10. ArticleCard 링크 변경
**`components/trends/ArticleCard.tsx` 수정**:
- 기존: `<a href={article.url} target="_blank">`
- 변경: `<Link href={/article/${article._id}}>`
- 앱 내 상세 페이지로 이동

### 11. lib/api.ts 확장
```typescript
export async function fetchArticle(id: string): Promise<Article>  // 추가
```

### 12. hooks 추가
```typescript
// hooks/useArticle.ts (NEW)
export function useArticle(id: string) {
  return useQuery({
    queryKey: ['article', id],
    queryFn: () => fetchArticle(id),
  });
}
```

---

## GitHub Actions 업데이트

### 13. crawl.yml 수정
```yaml
- name: Run crawler
  run: python -m crawler.main
  env:
    MONGODB_URI: ${{ secrets.MONGODB_URI }}

- name: Process articles with AI
  run: python -m crawler.process
  env:
    MONGODB_URI: ${{ secrets.MONGODB_URI }}
    OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
```

### 14. requirements.txt 업데이트
```
openai>=1.60.0
```

추가 (기존에 이미 있음: requests, beautifulsoup4)

### 15. GitHub Secrets 추가 (수동)
- `OPENAI_API_KEY` (필수)

---

## 파일 목록

| 액션 | 파일 | 목적 |
|------|------|------|
| **Backend (Python)** | | |
| NEW | `crawler/sources/content_fetcher.py` | URL → 본문 텍스트 추출 |
| NEW | `crawler/processor/__init__.py` | 패키지 초기화 |
| NEW | `crawler/processor/ai_client.py` | OpenAI API 래퍼 + 재시도 |
| NEW | `crawler/processor/article_processor.py` | raw → articles 변환 |
| NEW | `crawler/processor/briefing_generator.py` | articles → daily_briefings |
| NEW | `crawler/processor/prompts.py` | AI 프롬프트 템플릿 |
| NEW | `crawler/process.py` | 가공 엔트리포인트 |
| EDIT | `crawler/requirements.txt` | openai 추가 |
| EDIT | `.github/workflows/crawl.yml` | AI 가공 step 추가 |
| **Frontend (Next.js)** | | |
| EDIT | `types/article.ts` | content 필드 추가 |
| NEW | `app/api/articles/[id]/route.ts` | 단일 기사 API |
| NEW | `app/(tabs)/article/[id]/page.tsx` | 기사 상세 페이지 |
| NEW | `hooks/useArticle.ts` | 단일 기사 조회 훅 |
| EDIT | `lib/api.ts` | fetchArticle 함수 추가 |
| EDIT | `components/trends/ArticleCard.tsx` | 링크를 앱 내 상세로 변경 |

## 비용 추정
- GPT-4o-mini: 입력 $0.15/1M, 출력 $0.60/1M
- 배치당 ~100개 기사 (content 포함) → ~15K 입력 토큰 + ~5K 출력 토큰
- 브리핑 생성 → ~2K 입력 + ~1K 출력
- **일일 3회 × ~$0.01 ≈ 월 $1 미만**

## 검증
1. `MONGODB_URI=... python -m crawler.process` — 본문 크롤링 + AI 가공 로컬 실행
2. MongoDB Atlas에서 articles (content 포함), daily_briefings 데이터 확인
3. `npm run dev` → Trends에서 기사 클릭 → 상세 페이지 표시 확인
4. 상세 페이지: AI 요약 + 원문 본문 + 외부 링크 동작 확인
5. GitHub Actions workflow_dispatch → 전체 파이프라인 성공
