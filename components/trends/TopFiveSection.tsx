'use client';

import styled from '@emotion/styled';
import type { Article } from '@/types/article';
import ArticleCard from './ArticleCard';

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.subheading.fontSize};
  font-weight: ${({ theme }) => theme.typography.subheading.fontWeight};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

interface TopFiveSectionProps {
  articles: Article[];
}

export default function TopFiveSection({ articles }: TopFiveSectionProps) {
  const top5 = [...articles]
    .sort((a, b) => b.trendScore - a.trendScore)
    .slice(0, 5);

  return (
    <Section>
      <SectionTitle>오늘의 BEST 5</SectionTitle>
      {top5.map((article, i) => (
        <ArticleCard
          key={article._id}
          article={article}
          variant="ranked"
          rank={i + 1}
        />
      ))}
    </Section>
  );
}
