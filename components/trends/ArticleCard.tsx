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
        style={{
          display: 'block',
          backgroundColor: 'var(--color-fg)',
          borderRadius: '8px',
          padding: '24px',
          marginBottom: '16px',
          textDecoration: 'none',
        }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '8px' }}>
          <span style={{ flexShrink: 0, fontSize: '18px', fontWeight: 'bold', color: 'var(--color-accent)', minWidth: '24px' }}>{rank}</span>
          <h3 style={{ fontSize: '15px', fontWeight: 600, lineHeight: 1.4, color: 'var(--color-text-primary)', wordBreak: 'keep-all', flex: 1 }}>
            {article.title}
          </h3>
        </div>
        <p style={{
          fontSize: '13px',
          lineHeight: 1.5,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          color: 'var(--color-text-secondary)',
          marginBottom: '8px',
          wordBreak: 'keep-all',
        }}>
          {article.aiSummaryShort}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span style={{
            fontSize: '10px',
            fontWeight: 600,
            padding: '2px 6px',
            borderRadius: '9999px',
            ...(article.category === "global"
              ? { backgroundColor: '#dbeafe', color: '#2563eb' }
              : { backgroundColor: '#d1fae5', color: '#059669' }),
          }}>
            {article.category === "global" ? "Global" : "Ko"}
          </span>
          {article.isHot && <HotBadge />}
          {article.keywords.slice(0, 3).map((kw) => (
            <span key={kw} style={{
              fontSize: '11px',
              padding: '3px 8px',
              backgroundColor: 'var(--color-button)',
              borderRadius: '9999px',
              color: 'var(--color-text-secondary)',
            }}>
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
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        backgroundColor: 'var(--color-fg)',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '8px',
        textDecoration: 'none',
      }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <span style={{
            fontSize: '10px',
            fontWeight: 600,
            padding: '2px 6px',
            borderRadius: '9999px',
            ...(article.category === "global"
              ? { backgroundColor: '#dbeafe', color: '#2563eb' }
              : { backgroundColor: '#d1fae5', color: '#059669' }),
          }}>
            {article.category === "global" ? "Global" : "Ko"}
          </span>
          {article.isHot && <HotBadge />}
        </div>
        <h4 style={{
          fontSize: '14px',
          fontWeight: 500,
          color: 'var(--color-text-primary)',
          lineHeight: 1.4,
          marginBottom: '4px',
          wordBreak: 'keep-all',
        }}>
          {article.title}
        </h4>
        <p style={{
          fontSize: '12px',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          color: 'var(--color-text-tertiary)',
        }}>
          {article.aiSummaryShort}
        </p>
      </div>
    </a>
  );
}
