import type { Article } from "@/types/article";
import { colors } from "@/lib/theme";
import HotBadge from "./HotBadge";

interface ArticleCardProps {
  article: Article;
  variant: "ranked" | "compact";
  rank?: number;
}

export default function ArticleCard({ article, variant, rank }: ArticleCardProps) {
  if (variant === "ranked") {
    return (
      <div
        style={{
          display: "block",
          backgroundColor: colors.fg,
          borderRadius: "25px",
          padding: "20px",
          marginBottom: "12px",
        }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "10px" }}>
          <span
            style={{
              flexShrink: 0,
              width: "28px",
              height: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "13px",
              fontWeight: 700,
              color: "#fff",
              backgroundColor: colors.accent,
              borderRadius: "9999px",
            }}>
            {rank}
          </span>
          <h3
            style={{
              fontSize: "15px",
              fontWeight: 600,
              lineHeight: 1.4,
              color: colors.textPrimary,
              wordBreak: "keep-all",
              flex: 1,
            }}>
            {article.title}
          </h3>
        </div>
        <p
          style={{
            fontSize: "13px",
            lineHeight: 1.6,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            color: colors.textSecondary,
            marginBottom: "12px",
            wordBreak: "keep-all",
            paddingLeft: "40px",
          }}>
          {article.aiSummaryShort}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap", paddingLeft: "40px" }}>
          <span
            style={{
              fontSize: "10px",
              fontWeight: 600,
              padding: "2px 6px",
              borderRadius: "9999px",
              ...(article.category === "global"
                ? { backgroundColor: "#dbeafe", color: "#2563eb" }
                : { backgroundColor: "#d1fae5", color: "#059669" }),
            }}>
            {article.category === "global" ? "Global" : "Ko"}
          </span>
          {article.isHot && <HotBadge />}
          {article.keywords.slice(0, 3).map((kw) => (
            <span
              key={kw}
              style={{
                fontSize: "11px",
                padding: "3px 8px",
                backgroundColor: colors.button,
                borderRadius: "9999px",
                color: colors.textSecondary,
              }}>
              {kw}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        backgroundColor: colors.fg,
        borderRadius: "25px",
        padding: "16px",
        marginBottom: "8px",
      }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
          <span
            style={{
              fontSize: "10px",
              fontWeight: 600,
              padding: "2px 6px",
              borderRadius: "9999px",
              ...(article.category === "global"
                ? { backgroundColor: "#dbeafe", color: "#2563eb" }
                : { backgroundColor: "#d1fae5", color: "#059669" }),
            }}>
            {article.category === "global" ? "Global" : "Ko"}
          </span>
          {article.isHot && <HotBadge />}
        </div>
        <h4
          style={{
            fontSize: "14px",
            fontWeight: 500,
            color: colors.textPrimary,
            lineHeight: 1.4,
            marginBottom: "4px",
            wordBreak: "keep-all",
          }}>
          {article.title}
        </h4>
        <p
          style={{
            fontSize: "12px",
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            color: colors.textTertiary,
          }}>
          {article.aiSummaryShort}
        </p>
      </div>
    </div>
  );
}
