import type { Article } from "@/types/article";
import HotBadge from "./HotBadge";

interface ArticleCardProps {
  article: Article;
  variant: "ranked" | "compact";
  rank?: number;
}

export default function ArticleCard({ article, variant, rank }: ArticleCardProps) {
  if (variant === "ranked") {
    return (
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-fg rounded-lg p-lg mb-md no-underline">
        <div className="flex items-start gap-md mb-sm">
          <span className="shrink-0 text-[18px] font-bold text-accent min-w-[24px]">{rank}</span>
          <h3 className="text-[15px] font-semibold leading-[1.4] text-text-primary word-keep-all flex-1">
            {article.title}
          </h3>
        </div>
        <p className="text-[13px] leading-[1.5] line-clamp-3 text-text-secondary mb-sm word-keep-all">
          {article.aiSummaryShort}
        </p>
        <div className="flex items-center gap-[6px] flex-wrap">
          <span className={`text-[10px] font-semibold py-[2px] px-[6px] rounded-full ${
            article.category === "global"
              ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
              : "bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300"
          }`}>
            {article.category === "global" ? "Global" : "Ko"}
          </span>
          {article.isHot && <HotBadge />}
          {article.keywords.slice(0, 3).map((kw) => (
            <span key={kw} className="text-[11px] py-[3px] px-[8px] bg-button rounded-full text-text-secondary">
              {kw}
            </span>
          ))}
        </div>
      </a>
    );
  }

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-md bg-fg rounded-md p-md mb-sm no-underline">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-[6px] mb-[4px]">
          <span className={`text-[10px] font-semibold py-[2px] px-[6px] rounded-full ${
            article.category === "global"
              ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
              : "bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300"
          }`}>
            {article.category === "global" ? "Global" : "Ko"}
          </span>
          {article.isHot && <HotBadge />}
        </div>
        <h4 className="text-[14px] font-medium text-text-primary leading-[1.4] mb-[4px] word-keep-all">
          {article.title}
        </h4>
        <p className="text-[12px] line-clamp-3 text-text-tertiary">{article.aiSummaryShort}</p>
      </div>
    </a>
  );
}
