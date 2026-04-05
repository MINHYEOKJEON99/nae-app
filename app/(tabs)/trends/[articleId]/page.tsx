import { notFound } from "next/navigation";
import { getArticle } from "@/lib/data";
import HotBadge from "@/components/trends/HotBadge";
import BackButton from "@/components/trends/BackButton";

interface Props {
  params: Promise<{ articleId: string }>;
}

export default async function ArticleDetailPage({ params }: Props) {
  const { articleId } = await params;
  const article = await getArticle(articleId);

  if (!article) notFound();

  return (
    <div>
      <div className="mb-md">
        <BackButton />
      </div>

      <div className="bg-fg rounded-lg p-lg">
        <div className="flex items-center gap-[6px] mb-sm">
          <span className={`text-[10px] font-semibold py-[2px] px-[6px] rounded-full ${
            article.category === "global"
              ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
              : "bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-300"
          }`}>
            {article.category === "global" ? "Global" : "Korea"}
          </span>
          {article.isHot && <HotBadge />}
        </div>

        <h1 className="text-[18px] font-bold leading-[1.4] text-text-primary mb-md word-keep-all">
          {article.title}
        </h1>

        <p className="text-[14px] leading-[1.7] text-text-secondary mb-lg word-keep-all">
          {article.aiSummaryLong || article.aiSummaryShort}
        </p>

        <div className="flex flex-wrap gap-[6px] mb-lg">
          {article.keywords.map((kw) => (
            <span key={kw} className="text-[12px] py-[4px] px-[10px] bg-button rounded-full text-text-secondary">
              {kw}
            </span>
          ))}
        </div>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center py-[12px] bg-accent text-white rounded-lg text-[14px] font-semibold no-underline"
        >
          원문 보기
        </a>
      </div>
    </div>
  );
}
