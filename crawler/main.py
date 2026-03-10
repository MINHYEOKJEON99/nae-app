"""
뉴스 크롤러 엔트리포인트
- crawlBatch: YYYY-MM-DD-HH (KST)
- 5개 소스 순차 실행, 에러 시 해당 소스만 skip
- 결과 요약 로깅
"""

import sys
from datetime import datetime, timezone, timedelta

from crawler.db import ensure_indexes, upsert_articles, close
from crawler.sources import rss, zdnet

KST = timezone(timedelta(hours=9))

SOURCES = [
    ("글로벌 RSS", rss.fetch),
    ("한국 RSS", zdnet.fetch),
]


def main():
    crawl_batch = datetime.now(KST).strftime("%Y-%m-%d-%H")
    print(f"=== 뉴스 크롤링 시작 ===")
    print(f"배치: {crawl_batch}")
    print()

    # DB 인덱스 보장
    try:
        ensure_indexes()
    except Exception as e:
        print(f"[ERROR] DB 연결 실패: {e}")
        sys.exit(1)

    results = {}
    total_collected = 0
    total_new = 0
    total_skipped = 0

    for source_name, fetch_fn in SOURCES:
        print(f"--- {source_name} ---")
        try:
            articles = fetch_fn(crawl_batch)
            collected = len(articles)

            if collected > 0:
                db_result = upsert_articles(articles)
                new = db_result["new"]
                skipped = db_result["skipped"]
            else:
                new = 0
                skipped = 0

            results[source_name] = {
                "collected": collected,
                "new": new,
                "skipped": skipped,
            }
            total_collected += collected
            total_new += new
            total_skipped += skipped

        except Exception as e:
            print(f"  [ERROR] {source_name} 실패: {e}")
            results[source_name] = {"collected": 0, "new": 0, "skipped": 0, "error": str(e)}

        print()

    # 결과 요약
    print(f"=== 크롤링 완료 ===")
    print(f"배치: {crawl_batch}")
    print(f"{'소스':<15} {'수집':>6} {'신규':>6} {'스킵':>6}")
    print("-" * 40)
    for source_name, stats in results.items():
        error = stats.get("error")
        if error:
            print(f"{source_name:<15} {'ERROR':>6} {'-':>6} {'-':>6}  ({error})")
        else:
            print(f"{source_name:<15} {stats['collected']:>6} {stats['new']:>6} {stats['skipped']:>6}")
    print("-" * 40)
    print(f"{'합계':<15} {total_collected:>6} {total_new:>6} {total_skipped:>6}")

    close()


if __name__ == "__main__":
    # 패키지 임포트를 위해 프로젝트 루트를 sys.path에 추가
    import os
    sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    main()
