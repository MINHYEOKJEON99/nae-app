import type { Category, CrawlBatch } from './common';

export interface Article {
  _id: string;
  rawId: string;
  title: string;
  url: string;
  category: Category;
  tags: string[];
  trendScore: number;
  aiSummaryShort: string;
  aiSummaryLong: string;
  keywords: string[];
  isHot: boolean;
  crawlBatch: CrawlBatch;
  createdAt: string;
}
