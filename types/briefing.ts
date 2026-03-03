export interface MainIssue {
  title: string;
  summary: string;
  whyImportant: string;
  relatedArticleIds: string[];
}

export interface DailyBriefing {
  _id: string;
  date: string;
  intro: string;
  mainIssues: MainIssue[];
  closingSummary: string;
  keywords: string[];
  createdAt: string;
}
