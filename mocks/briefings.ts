import type { DailyBriefing } from '@/types/briefing';

export const mockBriefing: DailyBriefing = {
  _id: 'br-001',
  date: '2026-03-04',
  topic: 'IT',
  intro:
    '안녕하세요, 오늘의 IT 브리핑을 시작하겠습니다. 오늘은 AI 업계의 대형 발표와 함께, 국내 스타트업 투자 소식, 그리고 오픈소스 커뮤니티의 주목할 만한 움직임이 있었습니다. 바쁘신 분들을 위해 핵심만 정리해드리겠습니다.',
  mainIssues: [
    {
      title: 'OpenAI, GPT-5 공식 발표 — 멀티모달 성능 대폭 향상',
      summary:
        'OpenAI가 GPT-5를 공식 발표했습니다. 텍스트, 이미지, 음성을 동시에 처리하는 멀티모달 성능이 기존 대비 40% 향상되었으며, 추론 속도도 2배 빨라졌습니다. 기업용 API 가격은 오히려 30% 인하됩니다.',
      whyImportant:
        'AI 모델의 성능 격차가 점점 좁아지는 가운데, OpenAI의 이번 발표는 가격 경쟁까지 촉발하며 AI 서비스 시장의 판도를 바꿀 수 있습니다. 개발자들은 더 저렴한 비용으로 고성능 AI를 활용할 수 있게 됩니다.',
      relatedArticleIds: ['art-001', 'art-002'],
    },
    {
      title: '네이버클라우드, 하이퍼클로바X 오픈소스 전환 선언',
      summary:
        '네이버클라우드가 자체 개발한 하이퍼클로바X 모델을 오픈소스로 전환한다고 발표했습니다. Apache 2.0 라이선스로 공개되며, 한국어 특화 성능에서 GPT-4 수준을 보여주고 있습니다.',
      whyImportant:
        '한국어 AI 생태계에 큰 변화입니다. 국내 스타트업과 개발자들이 고품질 한국어 LLM을 무료로 사용할 수 있게 되면서, AI 서비스 개발의 진입 장벽이 크게 낮아질 전망입니다.',
      relatedArticleIds: ['art-003', 'art-004'],
    },
    {
      title: 'GitHub Copilot, 코드 리뷰 자동화 기능 출시',
      summary:
        'GitHub이 Copilot의 새로운 기능으로 PR 자동 리뷰를 출시했습니다. 보안 취약점 탐지, 성능 이슈 분석, 코드 스타일 검사를 AI가 자동으로 수행하며, 기존 CI/CD 파이프라인과 통합됩니다.',
      whyImportant:
        '개발 워크플로우의 자동화가 한 단계 더 발전했습니다. 코드 리뷰에 드는 시간을 최대 60% 절감할 수 있으며, 특히 소규모 팀에서 품질 관리의 효율성이 크게 높아질 것으로 보입니다.',
      relatedArticleIds: ['art-005'],
    },
  ],
  closingSummary:
    '오늘의 핵심은 AI 모델의 가격 인하 경쟁, 한국어 AI의 오픈소스화, 그리고 개발 도구의 AI 통합 가속화입니다. 내일 더 새로운 소식으로 찾아뵙겠습니다. 좋은 하루 보내세요!',
  keywords: ['GPT-5', 'OpenAI', '하이퍼클로바X', '오픈소스', 'GitHub Copilot', 'AI'],
  createdAt: '2026-03-04T08:00:00Z',
};
