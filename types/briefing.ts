export interface MainIssue {
  title: string;
  summary: string;
  whyImportant: string;
  relatedArticleIds: string[];
}

export interface DailyBriefing {
  _id: string;
  date: string;
  topic: string;
  intro: string;
  mainIssues: MainIssue[];
  closingSummary: string;
  keywords: string[];
  createdAt: string;
}
