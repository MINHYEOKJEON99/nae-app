"""
오늘의 브리핑 생성 스크립트

1. articles 컬렉션에서 오늘의 기사 조회 (global + korea)
2. Gemini로 마크다운 브리핑 생성
3. daily_briefings 컬렉션에 저장
"""

import os
import sys
import json
from datetime import datetime, timezone, timedelta

from pymongo import MongoClient
import google.generativeai as genai

KST = timezone(timedelta(hours=9))
GEMINI_MODEL = "gemini-2.5-flash"


def get_db():
    uri = os.environ.get("MONGODB_URI")
    if not uri:
        print("MONGODB_URI 환경변수가 설정되지 않았습니다")
        sys.exit(1)
    client = MongoClient(uri)
    return client, client.get_default_database()


def setup_gemini():
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("GEMINI_API_KEY 환경변수가 설정되지 않았습니다")
        sys.exit(1)
    genai.configure(api_key=api_key)
    return genai.GenerativeModel(GEMINI_MODEL)


def build_prompt(global_articles: list[dict], korea_articles: list[dict]) -> str:
    """기사 목록으로 Gemini 프롬프트 생성"""

    def format_articles(articles: list[dict]) -> str:
        lines = []
        for i, a in enumerate(articles, 1):
            lines.append(f"{i}. [{a['title']}]")
            if a.get("aiSummaryShort"):
                lines.append(f"   요약: {a['aiSummaryShort'][:200]}")
            lines.append(f"   trendScore: {a.get('trendScore', 0)}")
            lines.append("")
        return "\n".join(lines)

    global_text = format_articles(global_articles)
    korea_text = format_articles(korea_articles)

    return f"""당신은 IT 뉴스 브리핑 전문가입니다.
아래 글로벌과 한국 IT 기사 목록을 분석하여 오늘의 브리핑을 생성해주세요.

## 글로벌 기사
{global_text}

## 한국 기사
{korea_text}

---

아래 JSON 형식으로 응답해주세요. 반드시 valid JSON만 출력하세요.
마크다운 코드블록(```)으로 감싸지 마세요.

{{
  "intro": "오늘의 IT 뉴스 전체 흐름을 2-3문장으로 요약 (마크다운 사용 가능)",
  "mainIssues": [
    {{
      "title": "이슈 제목",
      "summary": "이슈 상세 요약 (마크다운으로 **굵게**, 리스트 등 활용, 3-5문장)",
      "whyImportant": "왜 중요한지 1-2문장"
    }}
  ],
  "closingSummary": "마무리 한줄평 (마크다운 사용 가능)",
  "keywords": ["키워드1", "키워드2", "키워드3", "키워드4", "키워드5"]
}}

규칙:
- mainIssues는 글로벌과 한국을 섞어서 가장 중요한 5개를 선정
- 모든 텍스트는 한국어로 작성
- summary에 마크다운을 적극 활용 (볼드, 리스트 등)
- keywords는 오늘의 핵심 키워드 5개
- intro는 간결하고 임팩트 있게
"""


def generate_briefing():
    client, db = get_db()
    model = setup_gemini()

    today = datetime.now(KST).strftime("%Y-%m-%d")
    print(f"=== 오늘의 브리핑 생성: {today} ===\n")

    art_col = db["articles"]

    # 오늘의 기사 조회 (trendScore 상위)
    global_articles = list(
        art_col.find({"category": "global"})
        .sort("trendScore", -1)
        .limit(20)
    )
    korea_articles = list(
        art_col.find({"category": "korea"})
        .sort("trendScore", -1)
        .limit(15)
    )

    print(f"글로벌 기사: {len(global_articles)}개")
    print(f"한국 기사: {len(korea_articles)}개")

    if not global_articles and not korea_articles:
        print("기사가 없습니다. 먼저 크롤링을 실행하세요.")
        client.close()
        return

    # Gemini로 브리핑 생성
    prompt = build_prompt(global_articles, korea_articles)
    print("\nGemini에 브리핑 생성 요청 중...")

    try:
        response = model.generate_content(prompt)
        raw_text = response.text.strip()

        # 마크다운 코드블록 제거
        if raw_text.startswith("```"):
            raw_text = raw_text.split("\n", 1)[1]
        if raw_text.endswith("```"):
            raw_text = raw_text.rsplit("```", 1)[0]
        raw_text = raw_text.strip()

        briefing_data = json.loads(raw_text)
    except json.JSONDecodeError as e:
        print(f"JSON 파싱 실패: {e}")
        print(f"원본 응답:\n{raw_text[:500]}")
        client.close()
        return
    except Exception as e:
        print(f"Gemini API 오류: {e}")
        client.close()
        return

    # daily_briefings에 저장
    briefing_doc = {
        "date": today,
        "intro": briefing_data.get("intro", ""),
        "mainIssues": [
            {
                "title": issue.get("title", ""),
                "summary": issue.get("summary", ""),
                "whyImportant": issue.get("whyImportant", ""),
                "relatedArticleIds": [],
            }
            for issue in briefing_data.get("mainIssues", [])
        ],
        "closingSummary": briefing_data.get("closingSummary", ""),
        "keywords": briefing_data.get("keywords", []),
        "createdAt": datetime.now(timezone.utc).isoformat(),
    }

    briefing_col = db["daily_briefings"]
    briefing_col.update_one(
        {"date": today},
        {"$set": briefing_doc},
        upsert=True,
    )

    print(f"\n브리핑 저장 완료!")
    print(f"  날짜: {today}")
    print(f"  주요 이슈: {len(briefing_doc['mainIssues'])}개")
    print(f"  키워드: {', '.join(briefing_doc['keywords'])}")

    # 미리보기
    print(f"\n--- 브리핑 미리보기 ---")
    print(f"\n[인트로]\n{briefing_doc['intro']}")
    for i, issue in enumerate(briefing_doc["mainIssues"], 1):
        print(f"\n[이슈 {i}] {issue['title']}")
        print(f"{issue['summary'][:100]}...")
    print(f"\n[마무리]\n{briefing_doc['closingSummary']}")
    print(f"\n[키워드] {', '.join(briefing_doc['keywords'])}")

    client.close()
    print("\n완료!")


if __name__ == "__main__":
    env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".env.local")
    if os.path.exists(env_path):
        with open(env_path) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    key, val = line.split("=", 1)
                    os.environ.setdefault(key.strip(), val.strip())

    generate_briefing()
